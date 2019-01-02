import { TaskTreeEvent } from './../TaskTreeEvent';
import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from '../task';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
    taskForm: FormGroup;
    taskSub: Subscription;
    activeTask: Task;
    addSubTask: boolean;
    title = '';

    constructor(private fb: FormBuilder, private ts: TasksService) {
        this.taskForm = this.fb.group({
            title: [{value: '', disabled: true}],
            description: [{value: '', disabled: true}]
        });
    }

    ngOnInit() {
        this.taskSub = this.ts.ActiveTask$.subscribe((event: TaskTreeEvent) => {
            this.activeTask = event.activeTask;
            this.addSubTask = event.addSubTask;

            if (event.addSubTask === false && event.deletedTask === false){
                this.taskForm.get('title').setValue(this.activeTask.title);
                this.taskForm.get('description').setValue(this.activeTask.description);
                this.taskForm.disable();
                this.title = `Task detailes for "${this.activeTask.title}"`;
            } else if(event.addSubTask){
                this.taskForm.reset();
                this.taskForm.enable();
                this.title = `Add sub task for "${this.activeTask.title}"` ;
            } else{
                this.activeTask = null;
            }

        });
    }

    ngOnDestroy() {
        this.taskSub.unsubscribe();
    }

    onSubmit() {
        if(this.activeTask.id === 0){
            this.activeTask = this.ts.addTask(this.taskForm.value, null);
            this.title = `Task detailes for "${this.activeTask.title}"`;
            return;
        }
        else if(this.addSubTask === false){
            this.activeTask = this.ts.updateTask(this.taskForm.value, this.activeTask);
        }
        else {
            this.activeTask = this.ts.addTask(this.taskForm.value, this.activeTask);
        }

        this.taskForm.disable();
        this.addSubTask = false;
        this.title = `Task detailes for "${this.activeTask.title}"`;
    }


    createNewTask(){
        this.activeTask = new Task('','' ,'not-started', 0);
        this.taskForm.enable();
        this.taskForm.reset();
        this.title = 'Create new task';
    }
}
