import { User } from "src/user/entities/user.entity";
export declare class Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    updatedAt: Date;
    deletedAt: Date;
    user: User;
}
