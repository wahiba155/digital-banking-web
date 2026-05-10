import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-header text-center">
              <h4>Login</h4>
            </div>
            <div class="card-body">
              <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
                <div class="mb-3">
                  <label>Username</label>
                  <input type="text" formControlName="username" 
                         class="form-control">
                </div>
                <div class="mb-3">
                  <label>Password</label>
                  <input type="password" formControlName="password" 
                         class="form-control">
                </div>
                <div *ngIf="errorMessage" class="text-danger mb-2">
                  {{errorMessage}}
                </div>
                <button class="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  handleLogin() {
  let username = this.loginForm.value.username;
  let password = this.loginForm.value.password;
  this.authService.login(username, password).subscribe({
    next: (data) => {
      this.authService.loadProfile(data);
      this.router.navigateByUrl('/admin/customers'); // ← admin/customers
    },
    error: (err) => {
      this.errorMessage = "Invalid credentials!";
    }
  });
}
}