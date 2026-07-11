import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}