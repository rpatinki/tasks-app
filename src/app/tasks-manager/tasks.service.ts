import { Injectable } from '@angular/core';
import { Task } from './task';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {

  idGenerate = 0;
  tasks: Task[] = [];

  private ActiveTask = new Subject<Task>();
  ActiveTask$ = this.ActiveTask.asObservable();

  private tasksSub = new Subject<Task[]>();
  tasksSub$ = this.tasksSub.asObservable();


  changeActiveTask(task: Task) {
    this.ActiveTask.next(task);
  }



  constructor() {
    this.tasks.push(new Task('first task', 'This is my first task for today', 'not-started', this.genId()));
    this.tasks[0].subTasks.push(new Task('Another', 'second task', 'not-started', this.genId()));
    this.tasksSub.next(this.tasks);
  }

  init(){
      this.tasksSub.next(this.tasks);
  }
//   getTasks(): Observable<Task[]> {
//     return this.tasksSub$;
//   }

  getTask(id): Task{
    return this.tasks.find(task => task.id === id);
  }


  addTask(task: any) {
    this.tasks.push(new Task(task.title, task.description, 'not-started', this.genId()));
    this.tasksSub.next(this.tasks);
  }

  updateTask(task: Task){
    let updateTask = this.getTask(task.id);
    updateTask = {...task};
  }

  deleteTask(task: Task){
      this.tasks = this.tasks.filter(node => task.id !== node.id);
      this.tasksSub.next(this.tasks);
  }

  private genId(): number {
    this.idGenerate++;
    return this.idGenerate;
  }
}
