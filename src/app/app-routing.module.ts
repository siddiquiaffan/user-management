// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: '', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule), canActivate: [AuthGuard] },
  { path: '**', loadChildren: () => import('./404/404.module').then((m) => m.Error404Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


// loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
// loadChildren: () => import('./users/users.module').then((m) => m.UsersModule), canActivate: [AuthGuard]