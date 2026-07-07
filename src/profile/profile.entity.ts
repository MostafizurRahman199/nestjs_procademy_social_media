import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile {

      @PrimaryGeneratedColumn()
      id: number;
    
     
      @Column({
        type:'varchar',
        length:100,
        nullable:true,
      })
      firstName: string;
    
    
    
      @Column({
        type:'varchar',
        length:100,
        nullable:true,
      })
      lastName: string;
    
    
    
      @Column({
        type:'varchar',
        length:10,
        nullable:true,
      })
      gender: string;


      @Column({
        type:'timestamp',
        nullable:true,
      })
      dateOfBirth:Date


      @Column({
        type:'text',
        nullable:true,
      })
      bio: string;


      @Column({
        type:'text',
        nullable:true,
      })
      profileImage: string;


      @Column({
        type:'text',
        nullable:true
      })
      phone: string;


      @Column({         
        type:'text',
        nullable:true
      }
      )
      address: string;


      @Column({
        type: 'text',
        nullable: true,
      })
      coverImage: string;


      @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
      })
      website: string;


      @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
      })
      location: string;


      @Column({
        type: 'boolean',
        default: false,
      })
      isVerified: boolean;

      @CreateDateColumn()
      createdAt: Date;

      @UpdateDateColumn()
      updatedAt: Date;

      @OneToOne(() => User, (user) => user.profile)
      user: User;


    
}