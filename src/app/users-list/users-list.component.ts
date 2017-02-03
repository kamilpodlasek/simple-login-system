import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  filter: string;
  public error: string;
  
  @Input() admin: boolean;
  @Input() loggedUser: User;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.getUsers('');//gets users from API and sets empty search filter to show all users
  }

  getUsers(filter: string): void {
    this.userService.getUsers()
      .then(users => {
        this.users = users;
        this.filter = filter;
      })
      .catch(error => this.error = error);
  }

  changeSearchTerm(term: string): void {//after each keyup in search box
    this.getUsers(term);//first get users list from API, then make a search
  }

  updateUsers(): void {
    this.getUsers(this.filter);
  }
}
