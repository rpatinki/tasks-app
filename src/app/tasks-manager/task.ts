type Status = "started" | "not-started" | "completed";

export class Task {
    title: string;
    description: string;
    status: Status;
    subTasks: Task [];
    id: number;
    
    constructor(title: string, description: string, status: Status, id: number, subTasks: Task [] = []) { 
        this.title = title;
        this.description = description;
        this.status = status;
        this.id = id;
        this.subTasks = subTasks;
    };
 
}