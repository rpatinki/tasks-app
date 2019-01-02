import { TaskTreeEvent } from './TaskTreeEvent';
import { Injectable } from '@angular/core';
import { Task } from './task';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { TaskUpdate } from './taskUpdate';

@Injectable()
export class TasksService {

  idGenerate = 0;
  tasks: Task[] = [];

  private ActiveTask = new Subject<TaskTreeEvent>();
  ActiveTask$ = this.ActiveTask.asObservable();

  private tasksSub = new Subject<Task[]>();
  tasksSub$ = this.tasksSub.asObservable();

  private tasksUpdates = new Subject<TaskUpdate>();
  tasksUpdates$ = this.tasksUpdates.asObservable();


  changeActiveTask(event: TaskTreeEvent) {
    this.ActiveTask.next(event);
  }



  constructor() {
    this.tasks.push(new Task('First task', 'This is my first task for today', 'not-started', this.genId()));
    this.tasks[0].subTasks.push(new Task('Another task', 'second task', 'not-started', this.genId(), 1));
    this.tasksSub.next(this.tasks);
  }

  init() {
    this.tasksSub.next(this.tasks);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id): Task {
    for (const task of this.tasks) {
      if (task.id === id) return task;
      for (const subtask of task.subTasks) {
        if (subtask.id === id) return subtask;
      }
    }
    return null;
  }


  addTask(task: any, parent: Task): Task {
    const newTask: Task = new Task(task.title, task.description, 'not-started', this.genId())

    if (!parent) { //null
      this.tasks.push(newTask);
    } else {
      newTask.parent = parent.id;
      const parentTask = this.tasks.find(taskItem => { return parent.id === taskItem.id });
      parentTask.subTasks.push(newTask);
    }

    // this.tasksSub.next(this.tasks);
    this.tasksUpdates.next(new TaskUpdate("new", newTask));

    return newTask;
  }

  updateTask(newValue: any, oldValue: Task): Task {

    let updateTask: Task = this.getTask(oldValue.id);
    Object.assign(updateTask, newValue);

    this.tasksUpdates.next(new TaskUpdate("update", updateTask));
    return updateTask;

  }

  deleteTask(task: Task) {
    for (let i=0 ; i < this.tasks.length; i++){
      if(this.tasks[i].id === task.id){
        this.tasks.splice(i, 1);
        break;
      }
      for (let j = 0; j < this.tasks[i].subTasks.length; j++) {
        if(this.tasks[i].subTasks[j].id === task.id){
          this.tasks[i].subTasks.splice(j, 1);
        }        
      }
    }

    this.tasksUpdates.next(new TaskUpdate("delete", task));
  }

  private genId(): number {
    this.idGenerate++;
    return this.idGenerate;
  }
}
