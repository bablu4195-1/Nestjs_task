/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.model';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {}
  

  async getTaskById(id: string): Promise<Task> {
      const found = await this.taskRepository.findOne(id);
      if(!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      return found;
  }

  async deleteTaskById(id: string): Promise<Task> {
    const task = this.getTaskById(id);
    await this.taskRepository.delete(id);
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
}


