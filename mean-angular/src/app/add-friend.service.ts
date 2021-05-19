import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Friend} from './friend';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {
  url = 'http://localhost:6969/addFriend';
  urlDel = 'http://localhost:6969/deleteFriend';

  constructor(private http: HttpClient) {}

  postRequest(friend: Friend): Observable<Friend> {
    return this.http.post( this.url, friend);
  }

  deleteFriend(email: string): Observable<any>{
    return this.http.post(this.urlDel, email);
  }
}
