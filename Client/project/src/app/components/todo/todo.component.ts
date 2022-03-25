import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(private srv: UtilsService) {}

  @Input()
  todo: any = [];

  @Output()
  userTaskID: EventEmitter<number> = new EventEmitter();

  isButtonVisible: boolean = false;

  ngOnInit(): void {
    if (this.todo.Completed == false) {
      this.isButtonVisible = true;
    }
  }

  completeTask() {
    this.isButtonVisible = false;
    console.log(this.todo.ID);
    this.userTaskID.emit(this.todo.ID);
  }
}
