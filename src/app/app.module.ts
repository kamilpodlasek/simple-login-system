import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

//for fake backend
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { PanelComponent } from './panel/panel.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFilterPipe } from './users-list/users-filter.pipe';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login/:status', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panel', component: PanelComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PanelComponent,
    UsersListComponent,
    UsersFilterPipe,
    LoginComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
