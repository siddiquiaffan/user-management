// users/users.module.ts
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Error404Component } from './404.component';

@NgModule({
    declarations: [
        Error404Component
    ],
    imports: [
        // CommonModule,
        RouterModule.forChild([
            { path: '', component: Error404Component }
        ])
    ],
    exports: [
        Error404Component
    ]
})
export class Error404Module { }
