export interface AccountDetails {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id: number;
  operationDate: Date;  // ← garder Date (cohérent avec Java)
  amount: number;
  type: string;
  description: string;
}

export interface BankAccount {
  id: string;
  balance: number;
  createdAt: string;
  status: string;
  type: string;
  customerDTO: any;
  overDraft?: number;
  interestRate?: number;
}