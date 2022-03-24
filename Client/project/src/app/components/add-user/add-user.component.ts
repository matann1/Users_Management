import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  idData: string = '';
  nameData: string = '';
  emailData: string = '';

  adduserData: boolean = true;

  @Output()
  addUser: EventEmitter<boolean> = new EventEmitter();

  user: any = {};

  constructor(private srv: UtilsService) {}

  sub: Subscription = new Subscription();

  ngOnInit(): void {}

  addUserPage() {
    console.log(!this.adduserData);
    this.addUser.emit(!this.adduserData);
  }

  addToUsers() {
    debugger;
    if (this.nameData != '' && this.emailData != '') {
      // this.user.ID=this.idData;
      this.user.Name = this.nameData;
      this.user.Email = this.emailData;
      this.sub = this.srv.addUser(this.user).subscribe((status: any) => {
        this.addUser.emit(!this.addUser);
        alert(status);
        this.ngOnInit();

        window.location.reload();
      });
    } else {
      alert('Error input try again!');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
