import { Profile } from 'src/profile/profile.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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


  @OneToOne(()=>Profile, { cascade: true })
  @JoinColumn({name:'profileId'})
  profile?:Profile;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}