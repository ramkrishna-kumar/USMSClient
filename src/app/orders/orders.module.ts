import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared-module';
import { OrdersComponent } from './orders.component';
import { OrderEditorComponent } from './order-editor/order-editor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Orders Page',
      urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Orders' }]
    },
    component: OrdersComponent
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
    OrdersComponent,
    OrderEditorComponent
  ],


})
export class OrdersModule { }
