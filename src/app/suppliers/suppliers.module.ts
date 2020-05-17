import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared-module';
import { SuppliersComponent } from './suppliers.component';
import { SupplierEditorComponent } from './supplier-editor/supplier-editor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Suppliers Page',
      urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Suppliers' }]
    },
    component: SuppliersComponent
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
  declarations: [
    SuppliersComponent,
    SupplierEditorComponent,
  ]
})
export class SuppliersModule { }
