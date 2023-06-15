import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(signupDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginUserDto): Promise<{
        token: string;
    }>;
    findOne(id: number): Promise<User>;
    newpassword(forgotpasswordDto: LoginUserDto): Promise<User>;
    logout(req: Request): Promise<import("typeorm").UpdateResult>;
}
