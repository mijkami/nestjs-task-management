import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    GetTasksWithFilters(filterDTO: GetTasksFilterDto): Task[] {
            const { status, search } = filterDTO;

            let tasks = this.getAllTasks();

            if (status) {
                tasks = tasks.filter(task => task.status === status)
            }

            if (search) {
                tasks = tasks.filter(task =>
                    task.title.includes(search) ||
                    task.description.includes(search),    
                );
            }

            return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id) 

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        } 

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id:string, status: TaskStatus): Task {
        const task =  this.getTaskById(id);
        task.status = status;
        return task;
    }
}
