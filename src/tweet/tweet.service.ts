import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async createTweet(userId: number, createTweetDto: CreateTweetDto): Promise<Tweet> {
    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      userId,
    });
    return this.tweetRepository.save(tweet);
  }

  async getAllTweets(): Promise<Tweet[]> {
    return this.tweetRepository.find({
      relations: { user: true, reactions: true, comments: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getSingleTweet(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: { user: true, reactions: true, comments: true },
    });
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }
    return tweet;
  }

  async getUserTweets(userId: number): Promise<Tweet[]> {
    return this.tweetRepository.find({
      where: { userId },
      relations: { user: true, reactions: true, comments: true },
      order: { createdAt: 'DESC' },
    });
  }

  async updateTweet(id: number, updateTweetDto: UpdateTweetDto): Promise<Tweet> {
    const tweet = await this.getSingleTweet(id);
    Object.assign(tweet, updateTweetDto);
    return this.tweetRepository.save(tweet);
  }

  async deleteTweet(id: number): Promise<void> {
    const tweet = await this.getSingleTweet(id);
    await this.tweetRepository.remove(tweet);
  }
}

