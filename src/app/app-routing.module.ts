// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule), canActivate: [AuthGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
