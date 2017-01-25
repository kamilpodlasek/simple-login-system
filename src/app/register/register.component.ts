import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public error: string;
  public passwordRepeat: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = {//user initialisation for two-way data binding
      id: null, username: '', password: '', email: '', rights: false
    }
    this.passwordRepeat = '';
  }

  register(): void {
    if(this.user.password === this.passwordRepeat) {//if both passwords match
      this.userService.getUser(this.user.username)//get user with entered username from API
        .then(u => {//for each user with entered name (should be max one)
          if(!u[0]) {//if there is no user with the same username
            this.userService.register(this.user)
              .then(response => {
                if(response) {
                  this.router.navigate(['/login', "registrationSuccess"]);
                } else {
                  this.error = 'Registration failed.';
                }
              })
              .catch(error => this.error = error);
          } else {
            this.error = `Username ${this.user.username} is already taken.`;
          }
        })
        .catch(error => this.error = error);
    } else {
      this.error = 'Both passwords must be the same!'
    }
  }
}
