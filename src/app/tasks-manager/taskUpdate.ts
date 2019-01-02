import { Task } from "./task";

type Operation = "new" | "update" | "delete";

export class TaskUpdate {
    operation: Operation;
    updatedTask: Task;
    
    constructor(operation: Operation, updatedTask: Task) { 
        this.operation = operation;
        this.updatedTask = updatedTask;
    };
 
}