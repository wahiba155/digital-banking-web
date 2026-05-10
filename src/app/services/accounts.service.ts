import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails, BankAccount } from '../model/account.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccount(accountId: string, page: number, size: number): 
      Observable<AccountDetails> {
    return this.http.get<AccountDetails>(
      `${environment.backendHost}/accounts/${accountId}/pageOperations`,
      { params: { page, size } }
    );
  }

  getAllAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(
      `${environment.backendHost}/accounts`
    );
  }

  getCustomerAccounts(customerId: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(
      `${environment.backendHost}/accounts/customer/${customerId}`
    );
  }

  saveCurrentAccount(
      initialBalance: number,
      overDraft: number,
      customerId: number): Observable<any> {
    let params = new HttpParams()
      .set('initialBalance', initialBalance)
      .set('overDraft', overDraft)
      .set('customerId', customerId);
    return this.http.post(
      `${environment.backendHost}/accounts/current`, null, { params }
    );
  }

  saveSavingAccount(
      initialBalance: number,
      interestRate: number,
      customerId: number): Observable<any> {
    let params = new HttpParams()
      .set('initialBalance', initialBalance)
      .set('interestRate', interestRate)
      .set('customerId', customerId);
    return this.http.post(
      `${environment.backendHost}/accounts/saving`, null, { params }
    );
  }

  debit(accountId: string, amount: number, description: string): 
      Observable<any> {
    return this.http.post(
      `${environment.backendHost}/accounts/debit`,
      { accountId, amount, description }
    );
  }

  credit(accountId: string, amount: number, description: string): 
      Observable<any> {
    return this.http.post(
      `${environment.backendHost}/accounts/credit`,
      { accountId, amount, description }
    );
  }

  transfer(
      accountSource: string,
      accountDestination: string,
      amount: number,
      description: string): Observable<any> {
    return this.http.post(
      `${environment.backendHost}/accounts/transfer`,
      { accountSource, accountDestination, amount, description }
    );
  }

  deleteAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.backendHost}/accounts/${accountId}`
    );
  }
}