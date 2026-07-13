import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { Tweet } from '../tweet/tweet.entity';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { AddHashtagsToTweetDto } from './dto/add-hashtags-to-tweet.dto';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}


  

  async createHashtag(dto: CreateHashtagDto): Promise<Hashtag> {
    // name is already normalised (lowercased, '#' stripped) by @Transform in the DTO
    const existing = await this.hashtagRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(
        `Hashtag "#${dto.name}" already exists (id: ${existing.id})`,
      );
    }

    const hashtag = this.hashtagRepository.create({ name: dto.name });
    return this.hashtagRepository.save(hashtag);
  }






  async getAllHashtags(): Promise<Hashtag[]> {
    return this.hashtagRepository.find({
      order: { name: 'ASC' },
    });
  }

  async getHashtagById(id: number): Promise<Hashtag> {
    const hashtag = await this.hashtagRepository.findOne({
      where: { id },
      relations: { tweets: true },
    });
    if (!hashtag) {
      throw new NotFoundException(`Hashtag with ID ${id} not found`);
    }
    return hashtag;
  }

  async getHashtagByName(name: string): Promise<Hashtag> {
    const normalised = name.replace(/^#/, '').toLowerCase().trim();
    const hashtag = await this.hashtagRepository.findOne({
      where: { name: normalised },
      relations: { tweets: true },
    });
    if (!hashtag) {
      throw new NotFoundException(`Hashtag "#${normalised}" not found`);
    }
    return hashtag;
  }

  async updateHashtag(id: number, dto: UpdateHashtagDto): Promise<Hashtag> {
    const hashtag = await this.getHashtagById(id);

    if (dto.name) {
      // Check the new name isn't already taken by another hashtag
      const conflict = await this.hashtagRepository.findOne({
        where: { name: dto.name },
      });
      if (conflict && conflict.id !== id) {
        throw new ConflictException(
          `Hashtag "#${dto.name}" is already used by another record`,
        );
      }
      hashtag.name = dto.name;
    }

    return this.hashtagRepository.save(hashtag);
  }

  async deleteHashtag(id: number): Promise<void> {
    const hashtag = await this.getHashtagById(id);
    await this.hashtagRepository.remove(hashtag);
  }

  // ─── Tweet ↔ Hashtag link operations ─────────────────────────────────────────

  /**
   * Add one or more hashtags to a tweet.
   * Existing associations are NOT duplicated (TypeORM handles idempotency).
   */
  async addHashtagsToTweet(
    tweetId: number,
    dto: AddHashtagsToTweetDto,
  ): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: { hashtags: true },
    });
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${tweetId} not found`);
    }

    const hashtags = await this.hashtagRepository.findBy({
      id: In(dto.hashtagIds),
    });

    // Guard: reject if any requested ID doesn't exist
    if (hashtags.length !== dto.hashtagIds.length) {
      const foundIds = hashtags.map((h) => h.id);
      const missing = dto.hashtagIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Hashtags with IDs [${missing.join(', ')}] not found`,
      );
    }

    // Merge without duplicating already-linked hashtags
    const existingIds = new Set(tweet.hashtags.map((h) => h.id));
    const newHashtags = hashtags.filter((h) => !existingIds.has(h.id));
    tweet.hashtags = [...tweet.hashtags, ...newHashtags];

    return this.tweetRepository.save(tweet);
  }

  /**
   * Remove specific hashtags from a tweet (does not delete the hashtag itself).
   */
  async removeHashtagsFromTweet(
    tweetId: number,
    dto: AddHashtagsToTweetDto,
  ): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: { hashtags: true },
    });
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${tweetId} not found`);
    }

    const removeSet = new Set(dto.hashtagIds);
    tweet.hashtags = tweet.hashtags.filter((h) => !removeSet.has(h.id));

    return this.tweetRepository.save(tweet);
  }

  /**
   * Get all tweets that use a specific hashtag.
   */
  async getTweetsByHashtagId(hashtagId: number): Promise<Tweet[]> {
    const hashtag = await this.hashtagRepository.findOne({
      where: { id: hashtagId },
      relations: {
        tweets: true,
      },
    });
    if (!hashtag) {
      throw new NotFoundException(`Hashtag with ID ${hashtagId} not found`);
    }
    return hashtag.tweets;
  }

  /**
   * Get all tweets that use a specific hashtag name (e.g. "nestjs" or "#nestjs").
   */
  async getTweetsByHashtagName(name: string): Promise<Tweet[]> {
    const hashtag = await this.getHashtagByName(name);
    return hashtag.tweets;
  }

  /**
   * Find or create a batch of hashtags by name (used when parsing tweet content).
   * Returns the persisted Hashtag records for all provided names.
   */
  async findOrCreateManyByName(names: string[]): Promise<Hashtag[]> {
    if (names.length === 0) return [];

    const normalised = [
      ...new Set(names.map((n) => n.replace(/^#/, '').toLowerCase().trim())),
    ];

    const existing = await this.hashtagRepository.findBy({
      name: In(normalised),
    });
    const existingNames = new Set(existing.map((h) => h.name));

    const toCreate = normalised
      .filter((n) => !existingNames.has(n))
      .map((name) => this.hashtagRepository.create({ name }));

    const created =
      toCreate.length > 0 ? await this.hashtagRepository.save(toCreate) : [];

    return [...existing, ...created];
  }
}
