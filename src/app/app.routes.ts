import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { AdminTemplateComponent } from './admin-template/admin-template';
import { CustomersComponent } from './customers/customers';
import { AccountsComponent } from './accounts/accounts';
import { NewCustomerComponent } from './new-customer/new-customer';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts';
import { NotAuthorizedComponent } from './not-authorized/not-authorized';
import { authGuard } from './guards/auth-guard';
import { authorizationGuard } from './guards/authorization-guard';
import { EditCustomerComponent } from './edit-customer/edit-customer';


export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "notAuthorized", component: NotAuthorizedComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "admin",
    component: AdminTemplateComponent,
    canActivate: [authGuard],
    children: [
      { path: "customers", component: CustomersComponent },
      { path: "accounts", component: AccountsComponent },
      {
        path: "new-customer",
        component: NewCustomerComponent,
        canActivate: [authorizationGuard],
        data: { role: "ROLE_ADMIN" }
      },
      {
        path: "edit-customer/:id", 
        component: EditCustomerComponent,
        canActivate: [authorizationGuard],
        data: { role: "ROLE_ADMIN" }
      },
      { path: "customer-accounts/:id", component: CustomerAccountsComponent },
    ]
  }
];