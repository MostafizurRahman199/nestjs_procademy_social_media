import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {


    constructor (private readonly usersService:UsersService){}


   tweets:{text:string, date:Date, userId:number}[] = [
    {
        text:'Hello everyone', date:new Date('2024-12-22'), userId:1
    },
     {
        text:'Hello everyone 2', date:new Date('2024-12-22'), userId:1
    },
    {
        text:'Hello everyone', date:new Date('2024-12-22'), userId:2
    },
    {
        text:'Hello everyone', date:new Date('2025-12-22'), userId:3
    }
   ]

   getUserTweet(userId:number){
    const user = this.usersService.getSingleUser(userId);
    if(!user){
        return 'User not found';
    }
    const tweet = this.tweets.filter(tweet=> tweet.userId === userId);
    return {
        userName:user.name,
        tweets:tweet
    };
   }
}
