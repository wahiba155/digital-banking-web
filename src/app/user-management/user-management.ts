import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, 
         Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './user-management.html'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  showAddForm: boolean = false;
  newUserForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

ngOnInit(): void {
  this.newUserForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    roles: ['USER']  // ← string simple, pas array
  });
  this.loadUsers();
}

handleAddUser() {
  if (this.newUserForm.invalid) return;

  // Convertir roles en array pour le backend
  const formValue = this.newUserForm.value;
  const newUser = {
    username: formValue.username,
    password: formValue.password,
    email: formValue.email,
    roles: [formValue.roles]  // ← wrapper dans array
  };

  this.http.post(`${environment.backendHost}/users`, newUser)
    .subscribe({
      next: () => {
        this.loadUsers();
        this.newUserForm.reset({ roles: 'USER' });
        this.showAddForm = false;
        alert("User added successfully!");
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Error adding user";
      }
    });
}

  loadUsers() {
    this.http.get<any[]>(`${environment.backendHost}/users`)
      .subscribe({
        next: (data) => { this.users = data; },
        error: (err) => { this.errorMessage = err.message; }
      });
  }



  handleDeleteUser(username: string) {
    if (!confirm("Delete user " + username + "?")) return;
    this.http.delete(`${environment.backendHost}/users/${username}`)
      .subscribe({
        next: () => { this.loadUsers(); },
        error: (err) => { this.errorMessage = err.message; }
      });
  }

  handleAddRole(username: string, roleName: string) {
    this.http.post(`${environment.backendHost}/users/addRole`,
      { username, roleName }).subscribe({
      next: () => { this.loadUsers(); },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  handleRemoveRole(username: string, roleName: string) {
    this.http.post(`${environment.backendHost}/users/removeRole`,
      { username, roleName }).subscribe({
      next: () => { this.loadUsers(); },
      error: (err) => { this.errorMessage = err.message; }
    });
  }
}