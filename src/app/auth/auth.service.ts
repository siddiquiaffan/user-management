// auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../shared/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';
  private tokenKey = 'authToken'; // Key for storing the authentication token in local storage

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getAuthToken(): string | null {
    // get token from cookie
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((cookie) => cookie.trim().startsWith('token='));
    if (!cookie) return null;
    return cookie.split('=')[1];
  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };

    return this.http
      .post(this.apiUrl, body)
      .pipe(catchError(this.errorHandler.handleError));
  }

  // Method to check if the user is authenticated (has a valid token)
  isAuthenticated(): boolean {
    const authToken = this.getAuthToken();
    return !!authToken; // Returns true if authToken is not null or undefined
  }

  // Method to store the authentication token in local storage
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Method to remove the authentication token from local storage (logout)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
