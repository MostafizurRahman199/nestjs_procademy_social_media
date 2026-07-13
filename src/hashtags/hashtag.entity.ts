import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tweet } from '../tweet/tweet.entity';

@Entity('hashtags')
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Stored in lowercase with no leading '#' (e.g. "nestjs", "typescript").
   * Uniqueness is enforced at the DB level.
   */
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  /**
   * Owning side lives on Tweet; this is the inverse side.
   * TypeORM reads the join-table definition from the owning side.
   */
  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags)
  tweets: Tweet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
