import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {

    constructor(private readonly tweetService: TweetService) { }

    @Get(':userId')
    public getUserTweet(@Param('userId', ParseIntPipe) userId: number){
        return this.tweetService.getUserTweet(userId);
    }

   
}
