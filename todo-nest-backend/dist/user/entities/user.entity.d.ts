import { Task } from "src/task/entities/task.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    token: string;
    task: Task[];
}
