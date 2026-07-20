import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { GetTweetsQueryDto } from './dto/get-tweets-query.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}


  @Post('user/:userId')
  public createTweet(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTweetDto: CreateTweetDto,
  ) {
    return this.tweetService.createTweet(userId, createTweetDto);
  }




  @Get()
  public getAllTweets(@Query() query: GetTweetsQueryDto) {
    return this.tweetService.getAllTweets(query);
  }




  @Get('user/:userId')
  public getUserTweets(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.tweetService.getUserTweets(userId, page, limit);
  }



  @Get(':id')
  public getSingleTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.getSingleTweet(id);
  }



  // NOTE: requestingUserId is taken from param temporarily — replace with req.user.id in production.
  @Patch(':id/user/:userId')
  public updateTweet(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.updateTweet(id, userId, updateTweetDto);
  }



  // NOTE: requestingUserId is taken from param temporarily — replace with req.user.id in production.
  @Delete(':id/user/:userId')
  public deleteTweet(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.tweetService.deleteTweet(id, userId);
  }

  
}
