# Introducing Modularity in Angular Application

## What is an Angular Module?

In [Angular](https://angular.io/), a module is a mechanism to group different components, directives, pipes and services etc. that are inter-related, in such a way that can be combined with other modules to create an application.

## About this exercise

Previously we scafolded a new Angular application in which we have integrated

- Scaffolded the angular application
- [FontAwesome](https://fontawesome.com/) Library for icons
- [Bootstrap](https://getbootstrap.com/) Library for styling buttons
- Bootstrap NavBar component
- Routing for multiple components e.g. (CreateAccountComponent, ManageAccountsComponent, DepositFundsComponent, TransferFundsComponent) for which we have already configured routing. Also we have commented code of links in app.component.html as below :

```html
<ul>
  <li>
    <a><i class="fas fa-chart-line"></i> Dashboard</a>
  </li>
  <div>
    <li>
      <a [routerLink]="['/transfer-funds']"
        ><i class="fas fa-random"></i> Transfer Funds</a
      >
    </li>
    <li>
      <a [routerLink]="['/deposit-funds']"
        ><i class="fas fa-money-check-alt"></i>Deposit Funds</a
      >
    </li>
    <li>
      <a [routerLink]="['/create-account']"
        ><i class="fas fa-user"></i> Create New Account</a
      >
    </li>
    <li>
      <a [routerLink]="['/manage-accounts']"
        ><i class="fas fa-users"></i> Manage Accounts</a
      >
    </li>
  </div>
</ul>
```

- SideNav having links which are navigating to these pages

In this exercise we are going to split our application into three modules

- Shared module in which we have components which are common to all application (toolbar, sidenav, and dashboard)
- Bank manager module (create account and manage accounts)
- Account holder module (transfer funds and deposit funds)
- We will implement the lazy loading of these modules in our application

### Step 1: Create Shared Module

Create a new module name **Shared** which will generate a new file shared.module.ts in shared folder.

```
ng g m shared
```

Now we will move our three common components inside the shared folder

- Dashboard
- ToolBar
- SideNav

We will remove one module for the SideNav which is **MatSidenavModule** from app.module.ts.

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

Since, shared module will be used in any other module of the application. So, we will export the components (Dashboard, Toolbar, and Sidenav) from shared.module.ts by adding these to exports parameter of NgModule decorator.

```typescript
exports: [ToolbarComponent, SidenavComponent, MatSidenavModule];
```

When we run our application using

```
ng serve
```

![image](https://user-images.githubusercontent.com/100778209/162630287-f3ed67ab-c9ab-4a4b-ade1-1fb44bb211da.png)

```
ng g m shared
```

### Step 2: Create Bank Manager Module

Now we will generate a new module for bank manager with its routing module.

```
ng g m bank-manager --routing
```

Move the components from root to bank-manager module

- Create account
- Manage account

Remove the imports from the app.module.ts file and add to declarations array of bank-manager module.

```typescript
declarations: [
    CreateAccountComponent,
    ManageAccountsComponent
  ],
```

Export these components from the bank-manager module.

```typescript
exports: [CreateAccountComponent, ManageAccountsComponent];
```

Update the sidenav component for bank-manager pages

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

Add the routing for the bank-manager.routing.module.ts file

```typescript
const routes: Routes = [
  { path: "bank-manager", component: DashboardComponent },
  { path: "create-account", component: CreateAccountComponent },
  { path: "manage-accounts", component: ManageAccountsComponent },
];
```

In order to load the bank-manager module we update the app-routing.module.ts

```typescript
{
  path: 'bank-manager',
  loadChildren: () => import('src/app/bank-manager/bank-manager.module').then((m) => m.BankManagerModule),
}
```

### Step 3: Create Account Holder Module

Now we will generate a new module for account holder with its routing module.

```
ng g m account-holder --routing
```

Move the components from root to bank-manager module

- Deposit funds
- Transfer funds

Remove the imports from the app.module.ts file and add to declarations array of account-holder module.

```typescript
declarations: [
    DepositFundsComponent,
    TransferFundsComponent,
  ],
```

Export these components from the account-holder module.

```typescript
exports: [DepositFundsComponent, TransferFundsComponent];
```

Update the sidenav component for bank-manager pages

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

Add the routing for the account-holder.routing.module.ts file

```typescript
const routes: Routes = [
  { path: "account-holder", component: DashboardComponent },
  { path: "deposit-funds", component: DepositFundsComponent },
  { path: "transfer-funds", component: TransferFundsComponent },
];
```

In order to load the account-holder module we update the app-routing.module.ts

```typescript
{
  path: 'account-holder',
  loadChildren: () => import('src/app/account-holder/account-holder.module').then((m) => m.AccountHolderModule),
}
```
