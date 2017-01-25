import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class AdminMenuComponent implements OnInit {
  public error: string;
  @Input() user: User;
  @Input() loggedUser: User;
  editBoxVisible: boolean;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    private userService: UserService,
    private _eref: ElementRef
  ) { }

  ngOnInit() {
    this.editBoxVisible = false;
  }

  onClick(event): void {
   if(!this._eref.nativeElement.contains(event.target)) {
     this.editBoxVisible = false;
   }
  }

  showEditBox(): void {
    this.editBoxVisible = true;
  }

  editUser(): void {
    this.userService.updateUser(this.user)
      .then(() => {
        this.edit.next(this.user);
        this.editBoxVisible = false;
      })
      .catch(error => this.error = error);
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user)
      .then(() => {
        this.delete.next(this.user);
      })
      .catch(error => this.error = error);
  }
}