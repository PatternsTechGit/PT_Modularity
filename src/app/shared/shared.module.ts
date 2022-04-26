import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SharedComponent } from './shared.component';


@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent,
    SharedComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule
  ],
  exports: [
      SharedComponent
  ]
})
export class SharedModule { }
