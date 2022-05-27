# Introducing Modularity in Angular Application

## What is an Angular Module?

In Angular, a [Module](https://angular.io/guide/architecture-modules) is a mechanism to group different components, directives, pipes and services etc. that are inter-related, in such a way that can be combined with other modules to create an application.

## About this exercise

Previously we scaffolded a new Angular application in which we have integrated

- Scaffolded the angular application
- [FontAwesome](https://fontawesome.com/) Library for icons
- [Bootstrap](https://getbootstrap.com/) Library for styling buttons
- Bootstrap NavBar component
- We have multiple components e.g. (CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent) in our application for which we have already configured routing.
- SideNav having links which are navigating to these components

As per our business requirement, In this exercise we are going to split our application into three modules

- **Shared Module** in which we have components which are common to all application (ToolbarComponent, SidenavComponent, and DashboardComponent)
- **Bank Manager Module** which will have components like CreateAccountComponent and ManageAccountsComponent
- **Account Holder Module** which will have components like TransferFundsComponent and DepositFundsComponent
- We will implement the lazy loading of these modules in our application

### Step 1: Create Shared Module

Create a new module name **Shared** which will generate a new file shared.module.ts in shared folder.

```
ng g m shared
```

We will also create a base component for Shared module using 

```
ng g c shared/shared --flat
```

Now we will move our three common components inside the shared folder. All of the files related to these components should be moved 

- DashboardComponent
- ToolBarComponent
- SideNavComponent

We will move **MatSidenavModule** from *app.module.ts* into *shared.module*.

Add *SidenavComponent, ToolbarComponent and DashboardComponent* components in the declaration section of *shared.module.ts* and *MatSidenavModule* to imports array of the *shared.module.ts*.

Finally, we need to add the Router module in imports array of the shared.module.ts.

```typescript

 declarations: [
    SidenavComponent,
    ToolbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule
  ]
  
```

Since the *sidenav* and *toolbar* are components that are shared across the application, we will move the code structure that was gluing together these two components from *app.component.html* to *shared.component.html*



```typescript
<div class="container-fluid" style="height: 100%;">
    <app-toolbar *ngIf="isUserLoggedIn" [inputSideNav]="sideNav"></app-toolbar>
    <mat-sidenav-container style="height: 100%">
      <mat-sidenav opened #sideNav mode="side">
          <app-sidenav *ngIf="isUserLoggedIn"></app-sidenav>
      </mat-sidenav>
      <mat-sidenav-content>
          <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
    </div>
```



Since, shared module will be now used in *app.component.ts*. So, we will export the SharedComponent from shared.module.ts by adding these to exports parameter of NgModule decorator.

```typescript
exports: [SharedComponent];
```

and in *app.component.html* file we will just use the selector of shared component 

```typescript
<app-shared></app-shared>
```

also *import* this **SharedModule** in *app.module.ts* file

```typescript
import { SharedModule } from './shared/shared.module';
// add SharedModule in imports section
imports:[SharedModule]
```

When we run our application using

```
npm start
```

![image](https://user-images.githubusercontent.com/100778209/162630287-f3ed67ab-c9ab-4a4b-ade1-1fb44bb211da.png)

### Step 2: Create Bank Manager Module

Now we will generate a new module for bank manager with its routing module.

```
ng g m bank-manager --routing
```

> **--routing** is added to generate the separate routing for this module

We will also create a base Component for this module using 

```
ng g c bank-manager
```

Move the following components from root to bank-manager module

- CreateAccountComponent
- ManageAccountComponent

Remove the imports of these component from the *app.module.ts* file and add to declarations array of *bank-manager.module.ts*.

```typescript
declarations: [
    CreateAccountComponent,
    ManageAccountsComponent
  ],
```

In order to load the bank-manager module in lazy way we add following config in *const routes: Routes* section of the *app-routing.module.ts*

```typescript
// If application no route is specified after base url the application will load DashboardComponent e.g http://localhost:4200
 {path: '', component: DashboardComponent },
  // for http://localhost:4200/bank-manager the application will lazily load bank-manager module and rest of the routing will be picked up from bank-manager module
{  path: 'bank-manager', loadChildren: () => import('src/app/bank-manager/bank-manager.module').then((m) => m.BankManagerModule),}
```

### 

Every module will have its own routing. Add the routing for the *bank-manager.routing.module.ts* file and also *import* the respective components.  



```typescript
const routes: Routes = [
  { path: "", component: DashboardComponent }, // since nothing is specified as a default route of bank-manager module so a dashboard will be loaded as a result of http://localhost:4200/bank-manager
    
    // to load CreateAccountComponent we have to route to http://localhost:4200/bank-manager/create-account
  { path: "create-account", component: CreateAccountComponent },
  { path: "manage-accounts", component: ManageAccountsComponent },
];
```

We will also Update the sidenav component for bank-manager pages. For this go to *sidenav.component.html* file in *sidenav* folder. Now update *Manage Accounts* and *Create New Accounts* with below given details.

```html
<li>
  <a [routerLink]="['bank-manager/create-account']"
    ><i class="fas fa-user"></i> Create New Account</a
  >
</li>
<li>
  <a [routerLink]="['bank-manager/manage-accounts']"
    ><i class="fas fa-users"></i> Manage Accounts</a
  >
</li>
```



### Step 3: Create Account Holder Module

Now we will generate a new module for account holder with its routing module.

```
ng g m account-holder --routing
```

We will also create a base Component for this module using 

```
ng g c account-holder
```

Move the following components from root to account-holder module

- TransferFundsComponent 
- DepositFundsComponent

Remove the imports from the app.module.ts file and add to declarations array of account-holder module.

```typescript
declarations: [
    DepositFundsComponent,
    TransferFundsComponent,
  ],
```
In order to load the account-holder module we add following route config in app-routing.module.ts

```typescript
{
  path: 'account-holder',
  loadChildren: () => import('src/app/account-holder/account-holder.module').then((m) => m.AccountHolderModule),
}
```

Add the routing for the account-holder.routing.module.ts file

```typescript
const routes: Routes = [
  { path: "", component: DashboardComponent },                    // default route for the module
  { path: "deposit-funds", component: DepositFundsComponent },
  { path: "transfer-funds", component: TransferFundsComponent },
];
```

Update the sidenav component for bank-manager components.For this go to *sidenav.component.html* file in *sidenav* folder. Now update *Transfer Funds* and *Deposit Funds* with below given details.

```html
<li>
  <a [routerLink]="['account-holder/transfer-funds']"
    ><i class="fas fa-random"></i> Transfer Funds</a
  >
</li>
<li>
  <a [routerLink]="['account-holder/deposit-funds']"
    ><i class="fas fa-money-check-alt"></i>Deposit Funds</a
  >
</li>
```

Overall structure look like this 

![](/1.png)

---------------

As a result of introducing modularity in the application, every modules (app modules, bank-manager module, account-holder-module) has its own routing app module's routing will lazily invoke other module's routing form within