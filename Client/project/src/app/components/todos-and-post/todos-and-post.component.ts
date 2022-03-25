import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-todos-and-post',
  templateUrl: './todos-and-post.component.html',
  styleUrls: ['./todos-and-post.component.css']
})
export class TodosAndPostComponent implements OnInit {
  userId: any = '';

  addTaskUser: boolean = true;
  taskListUser: boolean = false;

  constructor(private srv: UtilsService, private ar: ActivatedRoute) {}

  sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub = this.ar.params.subscribe(
      (data: any) => (this.userId = data['id'])
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
