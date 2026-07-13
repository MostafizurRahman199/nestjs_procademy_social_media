import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { AddHashtagsToTweetDto } from './dto/add-hashtags-to-tweet.dto';

@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}


  @Post()
  create(@Body() dto: CreateHashtagDto) {
    return this.hashtagsService.createHashtag(dto);
  }


  @Get()
  findAll() {
    return this.hashtagsService.getAllHashtags();
  }

  /**
   * GET /hashtags/search?name=nestjs
   * Lookup a hashtag by its name (accepts with or without '#').
   * Must be declared BEFORE :id to avoid route collision.
   */
  @Get('search')
  findByName(@Query('name') name: string) {
    return this.hashtagsService.getHashtagByName(name);
  }

  /** GET /hashtags/:id */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagsService.getHashtagById(id);
  }

  /** PATCH /hashtags/:id */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHashtagDto,
  ) {
    return this.hashtagsService.updateHashtag(id, dto);
  }

  /** DELETE /hashtags/:id */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagsService.deleteHashtag(id);
  }

  // ─── Tweet ↔ Hashtag relationship endpoints ──────────────────────────────────

  /**
   * POST /hashtags/tweet/:tweetId/add
   * Add one or more hashtags to a tweet.
   * Body: { hashtagIds: [1, 2, 3] }
   */
  @Post('tweet/:tweetId/add')
  addToTweet(
    @Param('tweetId', ParseIntPipe) tweetId: number,
    @Body() dto: AddHashtagsToTweetDto,
  ) {
    return this.hashtagsService.addHashtagsToTweet(tweetId, dto);
  }

  /**
   * DELETE /hashtags/tweet/:tweetId/remove
   * Unlink one or more hashtags from a tweet (hashtag records are NOT deleted).
   * Body: { hashtagIds: [1, 2] }
   */
  @Delete('tweet/:tweetId/remove')
  @HttpCode(HttpStatus.OK)
  removeFromTweet(
    @Param('tweetId', ParseIntPipe) tweetId: number,
    @Body() dto: AddHashtagsToTweetDto,
  ) {
    return this.hashtagsService.removeHashtagsFromTweet(tweetId, dto);
  }

  /**
   * GET /hashtags/:id/tweets
   * Get all tweets that use a specific hashtag (by ID).
   */
  @Get(':id/tweets')
  getTweetsByHashtag(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagsService.getTweetsByHashtagId(id);
  }
}
