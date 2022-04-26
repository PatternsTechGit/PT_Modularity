import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountHolderRoutingModule } from './account-holder-routing.module';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { AccountHolderComponent } from './account-holder.component';


@NgModule({
  declarations: [
    DepositFundsComponent,
    TransferFundsComponent,
    AccountHolderComponent,
  ],
  imports: [
    CommonModule,
    AccountHolderRoutingModule
  ]
})
export class AccountHolderModule { }
