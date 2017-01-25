import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});

  public logged: Observable<boolean>;
  private _logged: BehaviorSubject<boolean>;
  
  constructor(
    private http: Http,
    private router: Router
  ){
    this._logged = <BehaviorSubject<boolean>>new BehaviorSubject(false);
    this.logged = this._logged.asObservable();//to alert when user log in or log out
    if(localStorage.getItem('user') === null) {
      this._logged.next(false);
    } else {
      this._logged.next(true);
    }
  }

  register(user: User): Promise<boolean> {
    return this.http.post(`app/users`, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(response => {
        if(response) {//return status
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  login(user: User): Promise<boolean> {
    return this.getUser(user.username)
      .then(u => {
        if(u[0] && u[0].password === user.password) {//username and password correct
          localStorage.setItem('user', JSON.stringify(u[0]));
          this._logged.next(true);//alert about login
          this.router.navigate(['panel']);
          return true;//return status
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._logged.next(false);//alert about logout
  }
 
  checkCredentials(): boolean {
    if(localStorage.getItem('user') === null) {//if user is not logged in
      this.logout();
      this.router.navigate(['']);
      return false;//return status
    } else {
      return true;
    }
  }
  
  getUsers(): Promise<User[]> {
    return this.http.get(`app/users`)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  getUser(name: string): Promise<User> {
    return this.http.get(`app/users/?username=${name}`)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  searchUsers(name: string): Observable<User[]> {
    return this.http.get(`app/users/?username=${name}`)
      .map((response: Response) => response.json().data as User[]);
  }

  updateUser(user: User): Promise<User> {
    return this.http.put(`app/users/${user.id}`, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  deleteUser(user: User): Promise<boolean> {
    return this.http.delete(`app/users/${user.id}`, {headers: this.headers})
      .toPromise()
      .then(() => { return true; })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
