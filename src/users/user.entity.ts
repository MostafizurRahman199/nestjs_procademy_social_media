import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  
  @Column({
    type:'varchar',
    length:100,
    nullable:false,
  })
  firstName: string;



  @Column({
    type:'varchar',
    length:100,
    nullable:false,
  })
  lastName: string;



  @Column({
    type:'varchar',
    length:10,
    nullable:true,
  })
  gender: string;



  @Column({ 
    type:'varchar',
    length:255,
    nullable:false,
    unique: true,
  })
  email: string;



  @Column(
    {
        type:'varchar',
        length:255,
        nullable:false,
    }
  )
  password: string;
}