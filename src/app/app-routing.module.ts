import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'account-holder',
    loadChildren: () => import('src/app/account-holder/account-holder.module').then((m) => m.AccountHolderModule),
  },
  {
    path: 'bank-manager',
    loadChildren: () => import('src/app/bank-manager/bank-manager.module').then((m) => m.BankManagerModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
