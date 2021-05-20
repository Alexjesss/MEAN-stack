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
  // deleteFriendUrl = 'http://localhost:6969/deleteFriend';

  addFriend(): void {
    this.addFriendService.postRequest(this.friendModel).subscribe(succes => 'it works',
      error => console.log(error));
    this.fetchFriends(this.getAllFriends);
  }

  public async fetchFriends(getAllFriends: string): Promise<any> {
    await fetch(this.getAllFriends, {method: 'get', headers: {'Content-Type': 'application/json'}})
      .then(response => {
        return response.json() as Promise<any>;
      })
      .then(response => {
        return this.friendList = response;
      });
  }

  ngOnInit(): any {
    this.fetchFriends(this.getAllFriends);
  }

  constructor(
    private addFriendService: AddFriendService,
  ) {
  }

  // public async deleteFriend(email: string): Promise<any> {
  //   this.addFriendService.deleteFriend(email).subscribe
  //   this.deleteFriendUrl.then(response => console.log(this.getAllFriends)), error => console.error(error);
  //   await fetch(this.getAllFriends, {method: 'get', headers: {'Content-Type': 'application/json'}});
  // }




  public async deleteFriend(email: string): Promise<any> {
    this.addFriendService.deleteFriend(email).subscribe
    (response => this.fetchFriends(this.getAllFriends).then(response => console.log(this.getAllFriends)), error => console.error(error));
    await fetch(this.getAllFriends, {method: 'get', headers: {'Content-Type': 'application/json'}});
  }

}
