import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { AppService } from './app.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CommonService {

    currentTask: string = 'add';
    task: Task = new Task();
    allTasks: Task[] = new Array<Task>();
    ngbTab: NgbTabset;

    constructor(private appService: AppService) { }

    addorUpdateTask(task: Task, action) {
        console.log('addorUpdateTask action:'+action, task);
        task.status = action !== 'end' ? 'active' : 'inactive';
        this.appService.addorUpdateTask(task).subscribe(res => {
            console.log('addorUpdateTask success', res);
            this.task = new Task(); 
            this.getTasks();
            if(action ==='update'){
               this.currentTask = 'add'; 
            }
        this.switchTab('view-task');
        }, error => {
            console.log('addorUpdateTask error', error);
        });
    }

    getTasks() {
        this.appService.getTasks().subscribe(data => {
            console.log(data);
            this.allTasks = <Task[]>data;
            console.log('getTasks success:', this.allTasks);
        }, error => {
            console.log('getTasks error');
        });
    }

    switchTab(tab) {
        this.ngbTab.select(tab);
    }
}