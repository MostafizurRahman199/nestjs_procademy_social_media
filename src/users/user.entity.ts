import { Profile } from 'src/profile/profile.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import { Reaction } from 'src/tweet/reaction.entity';
import { Comment } from 'src/tweet/comment.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


 @Column({
    type:'varchar',
    length:100,
    nullable:false,
    unique:true,
  })
  username: string;


  @Column({ 
    type:'varchar',
    length:255,
    nullable:false,
    unique: true,
  })
  email: string;



  @Column({
    type:'varchar',
    length:255,
    nullable:false,
  })
  password: string;


  @OneToOne(()=>Profile, (profile) => profile.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({name:'profileId'})
  profile?:Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}