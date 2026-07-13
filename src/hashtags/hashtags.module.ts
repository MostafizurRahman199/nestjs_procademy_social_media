import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagsController } from './hashtags.controller';
import { HashtagsService } from './hashtags.service';
import { Hashtag } from './hashtag.entity';
import { Tweet } from '../tweet/tweet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hashtag, Tweet]),
  ],
  controllers: [HashtagsController],
  providers: [HashtagsService],
  exports: [HashtagsService],
})
export class HashtagsModule {}
