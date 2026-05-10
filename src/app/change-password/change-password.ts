import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, 
         Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './change-password.html'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  handleChangePassword() {
    if (this.changePasswordForm.invalid) return;
    this.http.put(
      `${environment.backendHost}/users/changePassword`,
      this.changePasswordForm.value
    ).subscribe({
      next: () => {
        this.successMessage = "Password changed successfully!";
        this.errorMessage = '';
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error || "Error changing password";
        this.successMessage = '';
      }
    });
  }
}