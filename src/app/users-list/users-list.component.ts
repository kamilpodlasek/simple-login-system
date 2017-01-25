import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  usersObs: Observable<User[]>;
  private searchTerms = new Subject<string>();
  //private prevTerm: string;
  public error: string;
  @Input() admin: boolean;
  @Input() loggedUser: User;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    //this.prevTerm = '';
    this.getUsers();//for list of users
    this.usersObs = this.searchTerms//for list of searched users
      .debounceTime(300)//time between terms searches
      .distinctUntilChanged()//omit if term didn't change
      .switchMap(term => term
        ? this.userService.searchUsers(term)
        : Observable.of<User[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<User[]>([]);
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users)
      .catch(error => this.error = error);
  }

  searchUsers(term: string): void {//after each keyup in search box
    this.searchTerms.next(term);//add new search term to observable
    //this.prevTerm = term;
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.getUsers();//updates users
    this.searchUsers(user.username);//updates usersObs
    //this.searchUsers(this.prevTerm);//updates usersObs
    //TODO: Fix bug with disappearing results after delete - update usersObs in different way
  }

  editUser(user: User, source: string): void {
    this.users = this.users.map(u => u.id === user.id ? user : u);
    if(source === "search") {
      this.searchUsers(user.username);//updates usersObs
    }
    this.getUsers();//updates users
  }
}
