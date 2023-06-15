import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<import("./entities/task.entity").Task>;
    findAll(req: any): Promise<import("./entities/task.entity").Task[]>;
    findAndCount(req: any): Promise<number>;
    findOne(id: number): Promise<import("./entities/task.entity").Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, req: any): Promise<import("./entities/task.entity").Task>;
    remove(id: number, req: any): Promise<String>;
}
