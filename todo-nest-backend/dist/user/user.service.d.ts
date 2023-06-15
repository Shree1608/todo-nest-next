import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UserService {
    private readonly userRepo;
    private readonly jwtservice;
    constructor(userRepo: Repository<User>, jwtservice: JwtService);
    signup(userdto: CreateUserDto): Promise<User>;
    login(loginDto: LoginUserDto): Promise<{
        token: string;
    }>;
    findOne(id: number): Promise<User>;
    logout(user: any): Promise<import("typeorm").UpdateResult>;
    forgotpassword(userdto: LoginUserDto): Promise<User>;
}
