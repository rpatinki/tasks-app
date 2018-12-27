import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {TreeModule} from 'primeng/tree';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';



import { TasksManagerComponent } from './tasks-manager/tasks-manager.component';
import { TasksService } from './tasks.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksTreeComponent } from './tasks-tree/tasks-tree.component';

@NgModule({
  declarations: [TasksManagerComponent, TaskDetailsComponent, TasksTreeComponent],
  imports: [
    CommonModule,
    TreeModule,
    ButtonModule,
    TooltipModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [
    TasksManagerComponent
  ],
  providers:[
    TasksService
  ]
})
export class TasksManagerModule { }
