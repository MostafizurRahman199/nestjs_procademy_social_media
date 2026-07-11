import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Tweet } from './tweet.entity';

export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
}

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ReactionType,
  })
  type: ReactionType;

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.reactions, { onDelete: 'CASCADE' })
  tweet: Tweet;

  @CreateDateColumn()
  createdAt: Date;
}
