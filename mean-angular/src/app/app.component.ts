import { Component } from '@angular/core';
import {Friend} from 'src/app/friend';
import {AddFriendService} from "./add-friend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-angular';
  friendList: Friend[];
  friendModel = new Friend();
  codingList = ['Javascript', 'PHP', 'Java', 'Python', 'C++'];

  getAllFriends = 'http://localhost:9000/allFriends';

  addFriend(): void {
    this.addFriendService.postRequest(this.friendModel).subscribe(succes => 'it works',
      error => console.log(error));
    this.fetchFriends();
  }

  public async fetchFriends(): Promise<any> {
    await fetch(this.getAllFriends, {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json() as Promise<any>;
      })
      .then(response => {
        return this.friendList = response;
      });
  }

  ngOnInit(): any {
    this.fetchFriends();
  }

  constructor(
    private addFriendService: AddFriendService,
  ) {
  }

  public async deleteFriend(email: string): Promise<any> {
    await fetch(this.getAllFriends, {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json() as Promise<any>;
      })
      .then(response => {
        return this.friendList = response;
      });
    this.friendList = this.friendList.filter(friend => friend.email !== email);
  }

}
