import { Task } from "./task";


export class TaskTreeEvent {
    activeTask: Task;
    addSubTask: boolean;
    deletedTask: boolean;
    
    constructor(activeTask: Task, addSubTask: boolean, deletedTask: boolean) { 
        this.activeTask = activeTask;
        this.addSubTask = addSubTask;
        this.deletedTask = deletedTask;
    };
 
}