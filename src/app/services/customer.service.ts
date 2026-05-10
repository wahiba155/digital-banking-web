import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `${environment.backendHost}/customers`
    );
  }

  searchCustomers(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `${environment.backendHost}/customers/search?keyword=${keyword}`
    );
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${environment.backendHost}/customers/${id}`
    );
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.backendHost}/customers`, customer
    );
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.backendHost}/customers/${id}`, customer
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.backendHost}/customers/${id}`
    );
  }
}