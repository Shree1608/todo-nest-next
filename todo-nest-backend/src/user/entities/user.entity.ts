import { IsEmail, IsNotEmpty } from "class-validator";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id :number

  
  @Column({nullable :true})
  name : string

  @IsNotEmpty()
  @IsEmail()
  @Column({nullable :false})
  email:string

  @IsNotEmpty()
  @Column()
  password :string

  @Column({nullable :true})
  token : string

  @OneToMany(()=> Task , (task:Task) =>task.user)
  task:Task[]
}
