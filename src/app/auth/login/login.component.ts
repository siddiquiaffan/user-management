// auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = null as any;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid)
      return window.alert('Invalid');

    this.isLoading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        document.cookie = `token=${response.token}`;
        this.router.navigate(['/'])
      },
      (error) => {
      // Handle login error (e.g., display an error message)
        window.alert(error?.status === 400 ? 'User not found' : 'Failed to login');
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );

  }
}
