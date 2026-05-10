import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, DecimalPipe, SlicePipe } from '@angular/common';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';
import { BankAccount } from '../model/account.model';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [NgForOf, NgIf, DecimalPipe, SlicePipe, RouterLink],
  templateUrl: './account-management.html',
  styleUrls: ['./account-management.css']
})
export class AccountManagementComponent implements OnInit {
  accounts: BankAccount[] = [];
  filteredAccounts: BankAccount[] = [];
  errorMessage!: string;

  constructor(
    private accountsService: AccountsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountsService.getAllAccounts().subscribe({
      next: (data: any[]) => {
        this.accounts = data;
        this.filteredAccounts = data;
      },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  handleSearch(event: any) {
    let keyword = event.target.value.toLowerCase();
    this.filteredAccounts = this.accounts.filter(a =>
      a.id.toLowerCase().includes(keyword) ||
      a.type.toLowerCase().includes(keyword) ||
      a.customerDTO?.name?.toLowerCase().includes(keyword)
    );
  }

  handleDeleteAccount(accountId: string) {
    let conf = confirm("Are you sure you want to delete this account?");
    if (!conf) return;
    this.accountsService.deleteAccount(accountId).subscribe({
      next: () => {
        this.loadAccounts();
        alert("Account deleted successfully!");
      },
      error: (err) => { this.errorMessage = err.message; }
    });
  }
}