import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'suppliers', loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'colleges', loadChildren: () => import('./colleges/colleges.module').then(m => m.CollegesModule) },
      {
        path: '',
        component: HeaderComponent
      }
    ]
  },
  {
    path: "login", component: LoginComponent, data: { title: "Login" }
  },
  {
    path: '**',
    component: NotFoundComponent, data: { title: "" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthenticationService, AuthGuard
  ]
})
export class AppRoutingModule { }
