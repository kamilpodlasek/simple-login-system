import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

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
export class AdminMenuComponent {
  public error: string;
  @Input() user: User;
  @Input() loggedUserId: number;
  editBoxVisible: boolean = false;

  @Output() updateUsers = new EventEmitter();

  constructor(
    private userService: UserService,
    private _eref: ElementRef
  ) { }

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
        this.updateUsers.emit();
        this.editBoxVisible = false;
      })
      .catch(error => this.error = error);
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user)
      .then(() => {
        this.updateUsers.emit();
      })
      .catch(error => this.error = error);
  }
}