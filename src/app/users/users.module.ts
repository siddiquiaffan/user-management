// users/users.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserListComponent],
  providers: [UserService], // Add UserService to the providers array
})
export class UsersModule { }
