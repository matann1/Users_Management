import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  sub: Subscription = new Subscription();

  userData: any = {};
  otherData: boolean = false;
  buttonType: any;
  backgroundUser: boolean = true;
  colorTask: string = 'green';
  lastUserid: string = '';
  checkEnterToUser: boolean = false;

  @Output()
  wasClick: EventEmitter<string> = new EventEmitter();

  @Input()
  userid: string = '';

  @Input()
  dataFromUsers: string = '';

  @Input()
  dataIndex: number = 0;

  constructor(private srv: UtilsService) {}

  ngOnInit(): void {
    this.sub = this.srv.getUser(this.userid).subscribe((data: any) => {
      this.userData = data;
      //check if one of task uncompleted if true the color is red
      data.Tasks.forEach((task: any) => {
        if (task.Completed == false) {
          this.colorTask = 'red';
        }
      });
    });
  }

  onSubmit(buttonType: any) {
    if (buttonType == 'update') {
      let obj: any = {};
      obj.Name = this.userData.Name;
      obj.Email = this.userData.Email;
      obj.Street = this.userData.Street;
      obj.City = this.userData.City;
      obj.Zipcode = this.userData.Zipcode;

      this.srv.updateUser(this.userid, obj).subscribe((status: any) => {
        alert(status);
        location.reload();
      });
    } else if (buttonType == 'delete') {
      this.srv.deleteUser(this.userid).subscribe((status: any) => {
        alert(status);
        location.reload();
      });
    }
  }

  showOtherData() {
    this.otherData = true;
  }

  hiddenOtherData() {
    this.otherData = false;
  }

  //check if user was clicked
  clickUser() {
    if (this.userid == this.dataFromUsers || this.dataFromUsers == '') {
      this.backgroundUser = !this.backgroundUser;
      if (!this.checkEnterToUser) {
        this.wasClick.emit(this.userid);
        this.checkEnterToUser = !this.checkEnterToUser;
      } else {
        this.wasClick.emit('');
        this.checkEnterToUser = !this.checkEnterToUser;
      }
    } else {
      alert('Already other user open');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
