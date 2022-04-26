# Introducing Modularity in Angular Application

## What is an Angular Module?

In Angular, a [Module](https://angular.io/guide/architecture-modules) is a mechanism to group different components, directives, pipes and services etc. that are inter-related, in such a way that can be combined with other modules to create an application.

## About this exercise

Previously we scafolded a new Angular application in which we have integrated

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
ng g c chared
```

Now we will move our three common components inside the shared folder. All of the files related to these components should be moved 

- DashboardComponent
- ToolBarComponent
- SideNavComponent

We will remove MatSidenavModule** from app.module.ts into shared.module.

There we also need to update all the related paths in the application for these components and remove the imports from the app.module.ts file.

Add these components in the declaration section of shared module and MatSidenavModule to imports array of the shared.module.ts.

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

The code structure that was gluing together the side nav and Nav bar will be moved from app.component to shared.component

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



Since, shared module will be now used in AppComponent. So, we will export the SharedComponent from shared.module.ts by adding these to exports parameter of NgModule decorator.

```typescript
exports: [Sharedcomponent];
```

and in AppComponent we will just use the selector of shared component 

```typescript
<app-shared></app-shared>
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

Remove the imports of these component from the app.module.ts file and add to declarations array of bank-manager module.

```typescript
declarations: [
    CreateAccountComponent,
    ManageAccountsComponent
  ],
```

In order to load the bank-manager module in lazy way we add following config in the app-routing.module.ts

```typescript
{ // If application no route is specified after base url the application will load DashboardComponent e.g http://localhost:4200
 { path: '', component: DashboardComponent },
  // for http://localhost:4200/bank-manager the application will lazily load bank-manager module and rest of the routing will be picked up from bank-manager module
  path: 'bank-manager', loadChildren: () => import('src/app/bank-manager/bank-manager.module').then((m) => m.BankManagerModule),
}
```

### 

Add the routing for the bank-manager.routing.module.ts file

```typescript
const routes: Routes = [
  { path: "", component: DashboardComponent }, // since nothing is specified as a default route of bank-manager module so a dashboard will be loaded as a result of http://localhost:4200/bank-manager
    
    // to load CreateAccountComponent we have to route to http://localhost:4200/bank-manager/create-account
  { path: "create-account", component: CreateAccountComponent },
  { path: "manage-accounts", component: ManageAccountsComponent },
];
```

We will also Update the sidenav component for bank-manager pages

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

Move the following components from root to bank-manager module

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

Update the sidenav component for bank-manager components

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

