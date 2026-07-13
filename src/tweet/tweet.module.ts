import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { UserModule } from 'src/users/users.module';
import { HashtagsModule } from 'src/hashtags/hashtags.module';
import { Tweet } from './tweet.entity';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tweet, Reaction, Comment]),
    UserModule,
    HashtagsModule,
  ],
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService]
})
export class TweetModule {}
