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

    constructor(private fb: FormBuilder, private ts: TasksService) {
        this.taskForm = this.fb.group({
            title: [''],
            description: ['']
        });
    }

    ngOnInit() {
        this.taskSub = this.ts.ActiveTask$.subscribe(task => {
            this.activeTask = task;
            this.taskForm.get('title').setValue(this.activeTask.title);
            this.taskForm.get('description').setValue(this.activeTask.description);
        });
    }

    ngOnDestroy() {
        this.taskSub.unsubscribe();
    }

    onSubmit() {
        this.addTask(this.taskForm.value);
    }

    private addTask(task: any) {
        this.ts.addTask(task);
    }
}
