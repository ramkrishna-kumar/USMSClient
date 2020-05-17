import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared-module';
import { HomeComponent } from './home.component';
import { OrderActivityListComponent } from './order-activity-list/order-activity-list.component';
import { ProductActivityListComponent } from './product-activity-list/product-activity-list.component';
import { QuotationActivityListComponent } from './quotation-activity-list/quotation-activity-list.component';
import { CollegeActivityListComponent } from './college-activity-list/college-activity-list.component';
import { UserActivityListComponent } from './user-activity-list/user-activity-list.component';
import { MiscellaneousActivityListComponent } from './miscellaneous-activity-list/miscellaneous-activity-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard Page',
      urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Dashboard' }]
    },
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    CollegeActivityListComponent,
    MiscellaneousActivityListComponent,
    OrderActivityListComponent,
    ProductActivityListComponent,
    QuotationActivityListComponent,
    UserActivityListComponent
  ],


})
export class HomeModule { }
