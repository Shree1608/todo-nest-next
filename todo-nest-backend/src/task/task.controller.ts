import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  create(@Body() createTaskDto: CreateTaskDto ,@Req() req , ) {
    return this.taskService.create(createTaskDto ,req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req) {
    return this.taskService.findAll(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('total')
  findAndCount(@Req() req) {
    return this.taskService.findAllAndCount(req.user)
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }
 
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto ,@Req() req) {
    return this.taskService.update(id, updateTaskDto ,req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number , @Req() req) {
    return this.taskService.remove(+id , req.user);
  }
}
