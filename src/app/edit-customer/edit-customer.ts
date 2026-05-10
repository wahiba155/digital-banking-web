import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-customer.html',
  styleUrls: ['./edit-customer.css']
})
export class EditCustomerComponent implements OnInit {
  editCustomerFormGroup!: FormGroup;
  customerId!: number;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.editCustomerFormGroup = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      email: this.fb.control('', [Validators.required, Validators.email])
    });

    // Charger les données du client
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.editCustomerFormGroup.patchValue({
          name: customer.name,
          email: customer.email
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  handleUpdateCustomer() {
    let customer = {
      id: this.customerId,
      ...this.editCustomerFormGroup.value
    };
    this.customerService.updateCustomer(this.customerId, customer).subscribe({
      next: () => {
        alert("Customer updated successfully!");
        this.router.navigateByUrl('/admin/customers');
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
}