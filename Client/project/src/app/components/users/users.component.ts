import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  term: any;
  users: any[] = [];
  filterUsers: any[] = [];
  sub: Subscription = new Subscription();

  was: any = '';

  addUser: any = false;

  constructor(private srv: UtilsService) {}

  search(searchWord: string) {
    debugger;
    this.filterUsers = this.users.filter(
      x => x.Name.includes(searchWord) || x.Email.includes(searchWord)
    );
  }

  ngOnInit(): void {
    this.sub = this.srv.getUsers().subscribe((userData: any) => {
      (this.users = userData), (this.filterUsers = userData);
    });
  }

  recieveData(event: any) {
    this.addUser = event;
  }

  recieveDatafromClick(event: any) {
    this.was = event;
  }

  addUserPage() {
    this.addUser = !this.addUser;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
