import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { AccountsService } from '../services/accounts.service';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './new-account.html',
  styleUrls: ['./new-account.css']
})
export class NewAccountComponent implements OnInit {
  newAccountFormGroup!: FormGroup;
  customers: Customer[] = [];
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newAccountFormGroup = this.fb.group({
      type: this.fb.control('CURRENT', [Validators.required]),
      customerId: this.fb.control('', [Validators.required]),
      initialBalance: this.fb.control(0, [Validators.required, Validators.min(0)]),
      overDraft: this.fb.control(0),
      interestRate: this.fb.control(0)
    });

    // Charger la liste des clients
    this.customerService.getAllCustomers().subscribe({
      next: (data) => { this.customers = data; },
      error: (err) => { this.errorMessage = err.message; }
    });
  }

  handleSaveAccount() {
    let type = this.newAccountFormGroup.value.type;
    let customerId = this.newAccountFormGroup.value.customerId;
    let initialBalance = this.newAccountFormGroup.value.initialBalance;

    if (type === 'CURRENT') {
      let overDraft = this.newAccountFormGroup.value.overDraft;
      this.accountsService.saveCurrentAccount(
          initialBalance, overDraft, customerId).subscribe({
        next: () => {
          alert("Current Account created successfully!");
          this.router.navigateByUrl('/admin/accounts');
        },
        error: (err) => { this.errorMessage = err.message; }
      });
    } else {
      let interestRate = this.newAccountFormGroup.value.interestRate;
      this.accountsService.saveSavingAccount(
          initialBalance, interestRate, customerId).subscribe({
        next: () => {
          alert("Saving Account created successfully!");
          this.router.navigateByUrl('/admin/accounts');
        },
        error: (err) => { this.errorMessage = err.message; }
      });
    }
  }
}