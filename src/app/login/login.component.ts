import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public error: string;
  public success: string;
  public logged: Observable<boolean>;
  public isLogged: boolean;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = {//user initialisation for two-way data binding
      id: null, username: '', password: '', email: '', rights: false
    }

    this.userService.logged.subscribe(
      value => this.isLogged = value,
      error => this.error = error
    );

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['status'] === "registrationSuccess") {
        this.success = "Your registration has been successful!";
      }
    });
  }

  login(): void {
    this.userService.login(this.user)
      .then(response => this.error = 'Login failed.')
      .catch(error => this.error = error);
  }
}
