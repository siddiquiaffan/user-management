// users/user-list/user-list.component.ts
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [MatTableModule]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  totalPages = 1;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number) {
    this.userService.getUsers(page).subscribe((data: any) => {
      this.users = data.data;
      this.totalPages = data.total_pages;
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers(page);
    }
  }
}
