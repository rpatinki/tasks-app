import { TaskUpdate } from './../taskUpdate';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from './../tasks.service';
import { TreeNode } from 'primeng/api';
import { Task } from '../task';
import { Subscription } from 'rxjs';
import { TaskTreeEvent } from '../TaskTreeEvent';

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

    constructor(private tasksService: TasksService) { }

    ngOnInit() {

        this.sub = this.tasksService.tasksUpdates$.subscribe(taskUpdate => {
            this.updateTasksTree(taskUpdate);
        });

        this.tasks = this.tasksService.getTasks();
        this.tasksTree = this.createTasksTree();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private updateTasksTree(update: TaskUpdate) {
        switch (update.operation) {
            case 'new':
                let node: TreeNode = {};
                node.label = update.updatedTask.title;
                node.data = update.updatedTask;
                if (update.updatedTask.parent === 0) {
                    this.tasksTree.push(node);
                } else {
                    const parent: TreeNode = this.getNodeParent(update.updatedTask);
                    if (parent.children) {
                        parent.children.push(node);
                    } else {
                        parent.children = [node];
                    }
                    parent.expanded = true;
                }
                break;
            case 'update':
                let updateNode: TreeNode = this.getNode(update.updatedTask);
                if (updateNode) {
                    updateNode.data = update.updatedTask;
                    updateNode.label = update.updatedTask.title;
                }
                break;
            case 'delete':
                this.deleteNode(update.updatedTask);
        }
    }

    private getNodeParent(task: Task): TreeNode {
        return this.tasksTree.find((node) => { return node.data.id === task.parent });
    }

    private getNode(task: Task): TreeNode {
        for (const node of this.tasksTree) {
            if (node.data.id === task.id) return node;
            for (const subNode of node.children) {
                if (subNode.data.id === task.id) return subNode;
            }
        }
        return null;
    }

    private deleteNode(task: Task) {
        for (let i = 0; i < this.tasksTree.length; i++) {
            if (this.tasksTree[i].data.id === task.id) {
                this.tasksTree.splice(i, 1);
                break;
            }
            for (let j = 0; j < this.tasksTree[i].children.length; j++) {
                if (this.tasksTree[i].children[j].data.id === task.id) {
                    this.tasksTree[i].children.splice(j, 1);
                }
            }
        }

    }

    private createTasksTree(): TreeNode[] {

        return this.tasks.map(task => {
            let node: TreeNode = {};
            node.label = task.title;
            node.data = task;

            for (let subtask of task.subTasks) {
                let subNode: TreeNode = {};
                subNode.label = subtask.title;
                subNode.data = subtask;
                if (node.children) {
                    node.children.push(subNode);
                } else {
                    node.children = [subNode];
                }
            }

            return node;
        })
    }


    addSubTask(task: Task) {
        this.tasksService.changeActiveTask(new TaskTreeEvent(task, true, false));
    }

    completeTask(task: Task) {
        const newVal: Task = task;
        newVal.status = 'completed';
        this.tasksService.updateTask(newVal, task);
    }

    startTask(task: Task) {
        const newVal: Task = task;
        newVal.status = 'started';
        this.tasksService.updateTask(newVal, task);
    }

    deleteTask(task: Task) {
        this.tasksService.deleteTask(task);
        this.tasksService.changeActiveTask(new TaskTreeEvent(task, false, true));
    }

    taskSelected(task: Task) {
        this.tasksService.changeActiveTask(new TaskTreeEvent(task, false, false));
    }


}
