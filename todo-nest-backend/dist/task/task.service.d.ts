import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class TaskService {
    private readonly tsakRepo;
    constructor(tsakRepo: Repository<Task>);
    create(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    findAllAndCount(user: User): Promise<number>;
    findAll(user: User): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    remove(id: number, user: User): Promise<String>;
}
