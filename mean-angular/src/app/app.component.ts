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

  getAllFriends = 'http://localhost:6969/allFriends';

  addFriend(): void {
    this.addFriendService.postRequest(this.friendModel).subscribe(succes => 'it works',
      error => console.log(error));
    this.fetchFriends().then(r => console.log(r));
  }

  public async fetchFriends(): Promise<any> {
    await fetch('http://localhost:6969/allFriends', {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json() as Promise<any>;
      })
      .then(response => {
        console.log(response)
        return this.friendList = response;
      });
  }

  ngOnInit(): any {
    this.fetchFriends().then(r => console.log(r));
  }

  constructor(
    private addFriendService: AddFriendService,
  ) {
  }


  public async deleteFriend(friend: Friend): Promise<any> {
    this.addFriendService.deleteFriend(friend).subscribe
    (response => this.fetchFriends().then(response => console.log(response)), error => console.error(error));
  }

  public async updateFriend(): Promise<any> {
    this.addFriendService.updateFriend(this.friendModel).subscribe
    (response => this.fetchFriends().then(response => console.log(this.getAllFriends)), error => console.error(error));
    this.fetchFriends().then(r => console.log(r));
  }

}
