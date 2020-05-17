import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared-module';
import { UsersComponent } from './users.component';
import { UserEditorComponent } from './user-editor/user-editor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users Page',
      urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Users' }]
    },
    component: UsersComponent
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
    UsersComponent,
    UserEditorComponent,
  ]
})
export class UsersModule { }
