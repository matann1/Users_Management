import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input()
  userId: any = '';

  addTaskUser: any = true;

  tasksListUser: any = false;

  userTaskIDmark: number = 0;
  userTasks: any = [];
  todo: any = {};
  user: any = {};
  titleData: string = '';

  constructor(private srv: UtilsService, private ar: ActivatedRoute) {}

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub1 = this.srv.getUser(this.userId).subscribe((data: any) => {
      this.user = data;
      data.Tasks.forEach((dataTasks: any) => {
        (this.todo.ID = dataTasks.ID),
          (this.todo.Title = dataTasks.Title),
          (this.todo.Completed = dataTasks.Completed);

        this.userTasks.push(this.todo);
        this.todo = {};
      });
    });
  }

  reciveID(event: number) {
    this.userTaskIDmark = event;
    let obj: any = this.user;
    obj.Tasks.forEach((task: any) => {
      if (task.ID == this.userTaskIDmark) {
        task.Completed = true;
      }
    });

    this.sub2 = this.srv.updateUser(obj._id, obj).subscribe((status: any) => {
      alert(status);
      location.reload();
    });
  }

  //check if click add task
  addTaskPage() {
    this.addTaskUser = !this.addTaskUser;
    this.tasksListUser = !this.tasksListUser;
  }

  addTaskToUser() {
    this.todo.Title = this.titleData;
    this.todo.Completed = false;
    this.user.Tasks.push(this.todo);
    this.sub3 = this.srv
      .updateUser(this.user._id, this.user)
      .subscribe((status: any) => {
        alert(status);
        this.addTaskUser = false;
        this.tasksListUser = true;
        this.ngOnInit();
        //location.reload();
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
