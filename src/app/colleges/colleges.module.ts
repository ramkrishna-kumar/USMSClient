import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared-module';
import { CollegesComponent } from './colleges.component';
import { CollegeEditorComponent } from './college-editor/college-editor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Colleges Page',
      urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Colleges' }]
    },
    component: CollegesComponent
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
    CollegesComponent,
    CollegeEditorComponent,
  ]
})
export class CollegesModule { }
