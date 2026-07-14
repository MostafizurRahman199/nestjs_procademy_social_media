import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { UsersService } from '../users/users.service';
import { HashtagsService } from '../hashtags/hashtags.service';

@Injectable()
export class TweetService {
  
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly usersService: UsersService,
    private readonly hashtagsService: HashtagsService,
  ) {}



  async createTweet(
    userId: number,
    createTweetDto: CreateTweetDto,
  ): Promise<Tweet> {
    await this.usersService.getSingleUser(userId);

    const hashtagNames = this.extractHashtags(createTweetDto.content);
    const hashtags = await this.hashtagsService.findOrCreateManyByName(
      hashtagNames,
    );

    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      userId,
      hashtags,
    });
    return this.tweetRepository.save(tweet);
  }

  async getAllTweets(page = 1, limit = 20): Promise<Tweet[]> {
    // Corner case: unbounded fetch can crash under load — enforce pagination
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100); // cap at 100 per request

    return this.tweetRepository.find({
      relations: { user: true, reactions: true, comments: true, hashtags: true },
      order: { createdAt: 'DESC' },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });
  }

  async getSingleTweet(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: { user: true, reactions: true, comments: true, hashtags: true },
    });
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }
    return tweet;
  }

  async getUserTweets(
    userId: number,
    page = 1,
    limit = 20,
  ): Promise<Tweet[]> {
  
    await this.usersService.getSingleUser(userId);

    return this.tweetRepository.find({
      where: { userId },
      relations: { user: true, reactions: true, comments: true, hashtags: true },
      order: { createdAt: 'DESC' },
      skip: (Math.max(1, page) - 1) * Math.min(Math.max(1, limit), 100),
      take: Math.min(Math.max(1, limit), 100),
    });
  }

  async updateTweet(
    id: number,
    requestingUserId: number,
    updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {

    // Corner case: empty body — nothing to update
    if (
      updateTweetDto.content === undefined &&
      updateTweetDto.images === undefined
    ) {
      throw new BadRequestException(
        'At least one field (content or images) must be provided to update a tweet',
      );
    }

    const tweet = await this.getSingleTweet(id);

    // Corner case: ownership — only the author can update their tweet
    if (tweet.userId !== requestingUserId) {
      throw new ForbiddenException(
        'You are not allowed to update this tweet',
      );
    }

    // Corner case: prevent userId field hijacking via Object.assign
    // Only pick allowed fields explicitly
    if (updateTweetDto.content !== undefined) {
      tweet.content = updateTweetDto.content;
      const hashtagNames = this.extractHashtags(updateTweetDto.content);
      tweet.hashtags = await this.hashtagsService.findOrCreateManyByName(
        hashtagNames,
      );
    }
    if (updateTweetDto.images !== undefined) {
      tweet.images = updateTweetDto.images;
    }

    return this.tweetRepository.save(tweet);
  }

  private extractHashtags(content: string): string[] {
    const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
    const matches = content.match(hashtagRegex) || [];
    return [...new Set(matches.map((tag) => tag.substring(1)))];
  }

  async deleteTweet(id: number, requestingUserId: number): Promise<void> {
    const tweet = await this.getSingleTweet(id);

    // Corner case: ownership — only the author can delete their tweet
    if (tweet.userId !== requestingUserId) {
      throw new ForbiddenException(
        'You are not allowed to delete this tweet',
      );
    }

    // Use softRemove to honour the @DeleteDateColumn on the entity
    // instead of hard-deleting and making soft-delete useless
    await this.tweetRepository.softRemove(tweet);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCronPurgeDeletedTweets() {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // Hard delete tweets where deletedAt is older than 3 days
    await this.tweetRepository.delete({
      deletedAt: LessThan(threeDaysAgo),
    });
  }
}
