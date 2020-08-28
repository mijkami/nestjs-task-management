import { Controller, Get, Body, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDTO : GetTasksFilterDto): Task[] {
        if(Object.keys(filterDTO).length) {
            return this.tasksService.GetTasksWithFilters(filterDTO);
        } else {
            return this.tasksService.getAllTasks();
        }
    }   


    @Get('/:id')
    getTaskbyID(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void {
        this.tasksService.deleteTask(id);  
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

}
