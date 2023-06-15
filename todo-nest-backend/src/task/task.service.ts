import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task)
  private readonly tsakRepo : Repository<Task>){}
  async create(createTaskDto: CreateTaskDto , user:User) : Promise<Task> {
    const addTask = await this.tsakRepo.create({
      ...createTaskDto,
      user:user 
    })
    return this.tsakRepo.save(addTask)
  }

  async findAllAndCount(user:User):Promise<number>{
    return this.tsakRepo.count({where :{user},relations :['user']})
  }

  async findAll(user:User):Promise<Task[]>{
    return this.tsakRepo.find({where :{user} ,relations :['user']})
  }

  async findOne(id: number):Promise<Task> {
    return this.tsakRepo.findOne({where : {id}})
  }

  async update(id: number, updateTaskDto: UpdateTaskDto , user:User) :Promise<Task> {
    const task = await this.tsakRepo.findOne({where :{id}});
    if(!task){
      throw new Error(`Task with Id ${id} not found`)
    }
    
    const updateTask = { user:user , ...task , ...updateTaskDto}
    const savedTask = await this.tsakRepo.save(updateTask );
    const updatedTaskFromDB = await this.tsakRepo.findOne({where :{id}});

  if (!updatedTaskFromDB) {
    throw new Error(`Failed to fetch updated task from the database`);
  }

  return updatedTaskFromDB;
    
  }

  async remove(id: number , user:User):Promise<String> {
    const deleteTask = await this.tsakRepo.softDelete(id)
    if(deleteTask){
      const deleteby = await this.tsakRepo.update(id , {user:user})
      return "deleted"
    }
    if(!deleteTask.affected) throw new NotFoundException(id)
   
  }
}
