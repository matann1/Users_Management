import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';
import { SharedService } from 'src/app/shared.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  sub: Subscription = new Subscription();
  clickEventSubscription: Subscription;

  userData: any = {};
  otherData: boolean = false;
  buttonType: any;
  backgroundUser: boolean = true;
  colorTask: string = 'green';
  lastUserid: string = '';
  checkEnterToUser: boolean = false;
  allTasksTrue: boolean = true;

  @Output()
  wasClick: EventEmitter<string> = new EventEmitter();

  @Input()
  userid: string = '';

  @Input()
  dataFromUsers: string = '';

  @Input()
  dataIndex: number = 0;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private srv: UtilsService, private shared: SharedService) {
    this.clickEventSubscription = this.shared.getClickEvent().subscribe(() => {
      this.allTasksTrue = true;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.sub = this.srv.getUser(this.userid).subscribe((data: any) => {
      this.userData = data;

      //check if one of task uncompleted if true the color is red
      data.Tasks.forEach((task: any) => {
        if (task.Completed == false) {
          this.colorTask = 'red';
          this.allTasksTrue = false;
        } else if (this.allTasksTrue == true) {
          this.colorTask = 'green';
          this.allTasksTrue = true;
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
        this.ngOnInit();
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
    console.log(this.dataFromUsers);
    console.log(this.userid);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
