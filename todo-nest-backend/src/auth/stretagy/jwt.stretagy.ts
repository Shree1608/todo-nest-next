import { Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtUserSrategy extends PassportStrategy(Strategy){
    constructor(
        
        @InjectRepository(User) 
        private readonly userRepo : Repository<User>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET
        })
    }

    async validate(payload){

        const {id} = payload;
        console.log(id);
        
            const finduser = await this.userRepo.findOneBy({id:id})
            console.log(finduser);
            
            if(finduser.token == null){
                throw new UnauthorizedException('login first')
            }
            return finduser
     
    }
}