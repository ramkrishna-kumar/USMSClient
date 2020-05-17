import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductsComponent } from './products.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { SharedModule } from '../shared/shared-module';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products Page',
      urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Products' }]
    },
    component: ProductsComponent
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
    ProductsComponent,
    ProductEditorComponent,
  ],


})
export class ProductsModule { }
