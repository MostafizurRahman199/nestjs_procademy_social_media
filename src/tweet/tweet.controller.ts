import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  // NOTE: For now, taking userId from param to test without Authentication guards.
  // In a real scenario, you'd get this from @Req() req -> req.user.id
  @Post('user/:userId')
  public createTweet(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTweetDto: CreateTweetDto,
  ) {
    return this.tweetService.createTweet(userId, createTweetDto);
  }

  @Get()
  public getAllTweets() {
    return this.tweetService.getAllTweets();
  }

  @Get('user/:userId')
  public getUserTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getUserTweets(userId);
  }

  @Get(':id')
  public getSingleTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.getSingleTweet(id);
  }

  @Patch(':id')
  public updateTweet(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.updateTweet(id, updateTweetDto);
  }

  @Delete(':id')
  public deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}

