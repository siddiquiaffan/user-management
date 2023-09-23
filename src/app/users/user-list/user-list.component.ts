// users/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  // standalone: true,
  // imports: []
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  totalPages = 1;
  totalUsers = 0;
  perPage: number = 5;
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar'];
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    // get query params from url
    const params = this.router.parseUrl(this.router.url).queryParams;
    this.currentPage = params['page'] ? parseInt(params['page']) : 1;
    this.perPage = params['per_page'] ? parseInt(params['per_page']) : 5;
  }

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  async loadUsers(page: number = this.currentPage) {
    // wait 2 seconds to simulate loading
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 200));

    this.userService.getUsers(page, this.perPage).subscribe((data: any) => {
      this.users = data.data;
      this.totalPages = data.total_pages;
      this.isLoading = false;
      this.totalUsers = data.total;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.currentPage = e.pageIndex + 1;
    this.perPage = e.pageSize;

    // dynamically change per_page in query params
    this.router.navigate([], {
      queryParams: {
        page: this.currentPage,
        per_page: this.perPage
      },
      queryParamsHandling: 'merge',
    });

    this.loadUsers(this.currentPage);
  }
}
