import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankManagerRoutingModule } from './bank-manager-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { BankManagerComponent } from './bank-manager.component';


@NgModule({
  declarations: [
    CreateAccountComponent,
    ManageAccountsComponent,
    BankManagerComponent
  ],
  imports: [
    CommonModule,
    BankManagerRoutingModule
  ]
})
export class BankManagerModule { }
