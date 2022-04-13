import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountHolderRoutingModule } from './account-holder-routing.module';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';


@NgModule({
  declarations: [
    DepositFundsComponent,
    TransferFundsComponent,
  ],
  imports: [
    CommonModule,
    AccountHolderRoutingModule
  ]
})
export class AccountHolderModule { }
