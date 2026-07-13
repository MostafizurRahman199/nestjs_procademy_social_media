import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';
import { Hashtag } from '../hashtags/hashtag.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  images?: string[];

  @OneToMany(() => Reaction, (reaction) => reaction.tweet)
  reactions: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.tweet)
  comments: Comment[];

  /**
   * Owning side of the Tweet <-> Hashtag many-to-many.
   * JoinTable creates the 'tweet_hashtags' junction table with
   * tweetId and hashtagId foreign key columns.
   */
  @ManyToMany(() => Hashtag, (hashtag) => hashtag.tweets, { cascade: true })
  @JoinTable({
    name: 'tweet_hashtags',
    joinColumn: { name: 'tweetId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'hashtagId', referencedColumnName: 'id' },
  })
  hashtags: Hashtag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}