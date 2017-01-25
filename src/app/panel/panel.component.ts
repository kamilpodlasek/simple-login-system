import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public user: User;
  public userType: string;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    if(this.userService.checkCredentials()) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userType = this.user.rights ? "Admin" : "User";
    }
  }
}