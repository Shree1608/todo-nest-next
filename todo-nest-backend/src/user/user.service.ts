import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { hash } from 'bcrypt';
import { ForgotpasswordDto } from './dto/forgot-password-dto';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly userRepo : Repository<User>, 
  private readonly jwtservice : JwtService){}


  async signup(userdto : CreateUserDto): Promise<User>{
    const {name, email, password } = userdto
    const findemail = await this.userRepo.findOneBy({email})
   if(findemail){
    throw new ConflictException('email already exist')
   }
   const hashPass = await hash(password ,10 )
   const user = await this.userRepo.create({
     name,
     email,
     password:hashPass
    })
    console.log(user);
      return this.userRepo.save(user)
   }

   async login(loginDto : LoginUserDto) : Promise<{token : string}>{
    const {email , password} = loginDto
    const finmail = await this.userRepo.findOneBy({email})
    if(!finmail){
      throw new NotFoundException('Email not found')
    }
    console.log(password);
    console.log(finmail.password);
    
    const isPassMatch = await bcrypt.compare(password , finmail.password)
    console.log(isPassMatch);
    if(!isPassMatch){
      throw new UnauthorizedException('invalid password')
    }
      const token = await this.jwtservice.sign({id :finmail.id})
      const updatetoken = await this.userRepo.update(finmail.id ,{token : token})
      return {token}
   }

   async findOne(id :number ):Promise<User>{
    return this.userRepo.findOneBy({id})
   }

   async logout(user){
    console.log(user);
    const logout = this.userRepo.update(user.id ,{token: null})
    return logout
    
   }

   async forgotpassword(userdto:LoginUserDto):Promise<User>{
    const { email ,password} = userdto
    const finmail = await this.userRepo.findOneBy({email})
    if(!finmail){
      throw new NotFoundException('Email not found')
    }
    const hashPass = await hash(password ,10 )
    const updatePass = await this.userRepo.update(finmail.id , {password:hashPass})
    return 
   }
   
 

}
