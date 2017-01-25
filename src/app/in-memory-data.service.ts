import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      { id: 1, username: 'admin', password: '123', email: 'admin@example.com', rights: true },
      { id: 2, username: 'user', password: '321', email: 'user@example.com', rights: false },
      { id: 3, username: 'Cierpisław', password: 'okoń', email: 'cierpislaw@example.com', rights: false },
      { id: 4, username: 'Dobiegniew', password: 'okoń', email: 'dobiegniew@example.com', rights: false },
      { id: 5, username: 'Falosław', password: 'okoń', email: 'faloslaw@example.com', rights: false }
    ];
    return { users };
  }
}
