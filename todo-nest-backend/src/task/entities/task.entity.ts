import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
      @PrimaryGeneratedColumn()
      id :number

      @Column()
      title : string

      @Column()
      description :string 

      @Column({nullable :true})
      deadline : string

      // @CreateDateColumn({ nullable: true })
      // deletedAt: Date;

      @UpdateDateColumn({ nullable: true })
      updatedAt: Date;
 
      @DeleteDateColumn({nullable:true})
      deletedAt : Date;

      @ManyToOne(()=> User , (user:User) => user.task)
      user:User
}
