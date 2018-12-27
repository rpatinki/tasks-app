import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from './../tasks.service';
import { TreeNode } from 'primeng/api';
import { Task } from '../task';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tasks-tree',
    templateUrl: './tasks-tree.component.html',
    styleUrls: ['./tasks-tree.component.css']
})
export class TasksTreeComponent implements OnInit, OnDestroy {

    tasksTree: TreeNode[];
    selectedTask: TreeNode;
    tasks: Task[];
    sub: Subscription;

    constructor(private tasksService: TasksService) {}

    ngOnInit() {
        this.sub = this.tasksService.tasksSub$.subscribe(tasks => {
            this.tasks = tasks
            this.tasksTree = this.createTasksTree();
        });
        this.tasksService.init();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private createTasksTree(): TreeNode[] {

        return this.tasks.map(task => {
            let node: TreeNode = {};
            node.label = task.title;
            node.data = task;

            for(let subtask of task.subTasks){
                let subNode: TreeNode = {};
                subNode.label = subtask.title;
                subNode.data = subtask;
                if(node.children){
                    node.children.push(subNode);
                } else {
                    node.children = [subNode];
                }
            }

            return node;
        })
    }

    addNewTask(event) {
        // addTaskToTree(Task)
    }

    addSubTask(task: Task) {
    }

    completeTask(task: Task) {
        task.status = 'completed';
        this.tasksService.updateTask(task);
    }

    startTask(task: Task) {
        task.status = 'started';
        this.tasksService.updateTask(task);
    }

    deleteTask(task: Task) {
        this.tasksService.deleteTask(task);
    }

    taskSelected(task: Task) {
        this.tasksService.changeActiveTask(task);
    }

    createNewTask(){
        
    }

}
