import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { autheticationGuard } from './guards/authetication.guard';

const routes: Routes = [
  { path :"login", component : LoginComponent},
  { path :"", redirectTo:"/login",pathMatch:"full"},
  { path :"admin", component : AdminTemplateComponent,canActivate:[autheticationGuard],
  children:[
    { path :"customers", component : CustomersComponent},
    { path :"accounts", component : AccountsComponent},
    { path :"new-customer", component : NewCustomerComponent},
     { path :"customer-accounts/:id", component : CustomerAccountsComponent},
  ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
