// auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = null as any;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      )]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          // Handle successful login (e.g., store token and redirect)
          // add token in cookie
          document.cookie = `token=${response.token}`;
        },
        (error) => {
          // Handle login error (e.g., display an error message)
          window.alert(error?.message ?? 'Failed to login');
        }
      );
    }
  }
}
