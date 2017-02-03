import { PipeTransform, Pipe } from '@angular/core';

import { User } from '../user';

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {
  transform(value: User[], filterBy: string): User[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((user: User) =>
      user.username.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}