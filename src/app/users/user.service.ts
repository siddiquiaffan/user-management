// users/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../shared/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  // Method to fetch a list of users with pagination
  getUsers(page: number = 1, perPage: number = 6): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&per_page=${perPage}`;
    return this.http
      .get(url)
      .pipe(catchError(this.errorHandler.handleError));
  }
}
