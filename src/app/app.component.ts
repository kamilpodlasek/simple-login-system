import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public logged: Observable<boolean>;
  public isLogged: boolean;
  public error: string;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.isLogged = false;//template depends on this variable
    this.userService.logged.subscribe(
      value => this.isLogged = value,
      error => this.error = error
    );
  }
}
