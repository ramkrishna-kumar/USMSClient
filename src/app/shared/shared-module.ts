import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LocalDateTimePipe } from './pipes/local-date-time.pipe';
import { TimeDiffWordsPipe } from './pipes/time-diff-words.pipe'
import { SecondsToTimespanPipe } from './pipes/seconds-to-timespan.pipe';
import { CustomTypeaheadComponent } from './components/custom-typeahead/custom-typeahead.component';
import { CustomDatepickerComponent } from './components/custom-datepicker/custom-datepicker.component';
import { CustomDataTableComponent } from './components/custom-data-table/custom-data-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [    
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule
  ],
  declarations: [
    CustomTypeaheadComponent,
    CustomDatepickerComponent,    
    CustomDataTableComponent,
    NotFoundComponent,
    LocalDateTimePipe,
    TimeDiffWordsPipe,
    SecondsToTimespanPipe,
    PaginationComponent
  ],
  exports: [CustomTypeaheadComponent, CustomDatepickerComponent, CustomDataTableComponent, NotFoundComponent, LocalDateTimePipe, TimeDiffWordsPipe, SecondsToTimespanPipe, PaginationComponent]
})
export class SharedModule { }
