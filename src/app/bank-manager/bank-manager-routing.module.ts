import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';

const routes: Routes = [
  { path: 'bank-manager', component: DashboardComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'manage-accounts', component: ManageAccountsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankManagerRoutingModule { }
