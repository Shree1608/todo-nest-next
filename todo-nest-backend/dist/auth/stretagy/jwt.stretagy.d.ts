import { Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
declare const JwtUserSrategy_base: new (...args: any[]) => Strategy;
export declare class JwtUserSrategy extends JwtUserSrategy_base {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    validate(payload: any): Promise<User>;
}
export {};
