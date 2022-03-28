import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input()
  userId: any = '';

  @Output()
  refreshComp: EventEmitter<boolean> = new EventEmitter();

  addTaskUser: any = true;

  isButtonVisible: boolean = false;

  tasksListUser: any = false;

  todo: any = {};
  user: any = {};
  titleData: string = '';
  lastIDofTasks: number = 0;

  constructor(private srv: UtilsService, private shared: SharedService) {}

  sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub = this.srv.getUser(this.userId).subscribe((data: any) => {
      this.user = data;
      data.Tasks.forEach((dataTasks: any) => {
        if (dataTasks.Completed) {
          this.isButtonVisible = true;
        }
        this.lastIDofTasks = dataTasks.ID;
      });
    });
  }

  //check if click add task
  addTaskPage() {
    this.addTaskUser = !this.addTaskUser;
    this.tasksListUser = !this.tasksListUser;
  }

  //add task to user
  addTaskToUser() {
    this.todo.ID = this.lastIDofTasks + 1;
    this.todo.Title = this.titleData;
    this.todo.Completed = false;
    this.user.Tasks.push(this.todo);
    this.sub = this.srv
      .updateUser(this.user._id, this.user)
      .subscribe((status: any) => {
        alert(status);
        // debugger;
        this.addTaskUser = !this.addTaskUser;
        this.tasksListUser = !this.tasksListUser;

        this.shared.sendClickEvent();
        // this.ngOnInit();
      });
  }

  completeTask(taskID: number) {
    this.user.Tasks.forEach((task: any) => {
      if (task.ID == taskID) {
        task.Completed = true;
        this.sub = this.srv
          .updateUser(this.user._id, this.user)
          .subscribe((status: any) => {
            alert(status);
            this.shared.sendClickEvent();
            // this.ngOnInit();
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
