import { TasksService } from './../tasks.service';
import {Component,OnInit} from '@angular/core';
import {TreeNode} from 'primeng/api';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-manager',
  templateUrl: './tasks-manager.component.html',
  styleUrls: ['./tasks-manager.component.css']
})
export class TasksManagerComponent  {

  constructor() { }

}
