import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository) private taskRepository: TaskRepository,
	) {}

	async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto);
	}

	async getTaskById(id: number): Promise<Task> {
		const task = await this.taskRepository.findOne(id);
		if (!task) {
			throw new NotFoundException(`Task with ID '${id}' not found !!`);
		}
		return task;
	}

	async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async deleteTask(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Task with ID '${id}' not found !!`);
		}
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();

		return task;
	}
}
