import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CustomerService } from "../services/customer.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Customer } from "../model/customer.model";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService  // ← ajouter

  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

handleDeleteCustomer(c: Customer) {
  // Vérifier si admin
  if (!this.authService.roles.includes('ROLE_ADMIN')) {
    this.router.navigateByUrl('/notAuthorized');
    return;
  }

  let conf = confirm("Are you sure?");
  if (!conf) return;

  this.customerService.deleteCustomer(c.id).subscribe({
    next: (resp) => {
      this.customers = this.customers.pipe(
        map(data => {
          let index = data.indexOf(c);
          data.splice(index, 1);
          return data;
        })
      );
    },
    error: err => {
      console.log(err);
    }
  });
}

 handleCustomerAccounts(customer: Customer) {
  this.router.navigateByUrl(
    "/admin/customer-accounts/" + customer.id,  // ← ajouter /admin/
    { state: customer }
  );
}
}