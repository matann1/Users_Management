import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input()
  userId: any = '';

  addPostUser: any = true;
  postsListUser: any = false;

  userPost: any = [];
  post: any = {};
  user: any = {};

  constructor(private srv: UtilsService, private shared: SharedService) {}

  sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub = this.srv.getUser(this.userId).subscribe((data: any) => {
      this.user = data;

      data.Posts.forEach((dataPost: any) => {
        (this.post.Title = dataPost.Title),
          (this.post.Body = dataPost.Body),
          this.userPost.push(this.post);
        this.post = {};
      });
    });
  }

  //navigate to add post page or back from him
  addPostPage() {
    this.postsListUser = !this.postsListUser;
    this.addPostUser = !this.addPostUser;
  }

  //add post to user
  addPostToUser() {
    this.post = this.post;
    this.user.Posts.push(this.post);
    this.sub = this.srv
      .updateUser(this.user._id, this.user)
      .subscribe((status: any) => {
        alert(status);
        this.postsListUser = !this.postsListUser;
        this.addPostUser = !this.addPostUser;

        this.shared.sendClickEvent();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
