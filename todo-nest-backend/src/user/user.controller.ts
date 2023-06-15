import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto : CreateUserDto) :Promise<User>{   
    return this.userService.signup(signupDto)
  }
  @Post('login')
  async login(@Body() loginDto : LoginUserDto): Promise<{token : string}>{
    return this.userService.login(loginDto)
  }
  @Get(':id')
  async findOne(@Param('id') id:number):Promise<User>{
    return this.userService.findOne(id)
  }
  
  @Post('forgotpassword')
  async newpassword(@Body() forgotpasswordDto:LoginUserDto):Promise<User>{
    return this.userService.forgotpassword(forgotpasswordDto)
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req:Request){
    const user = req.user
    return this.userService.logout(user)
  }
}
