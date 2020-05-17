import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MomentDateFormatter } from '../../miscellaneous/moment-date-formatter';

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter },
    //{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomDatepickerComponent)
    }
  ]
})
export class CustomDatepickerComponent implements OnInit, ControlValueAccessor {

  startDateFormat: string;

  @Input("placeholder")
  placeholder: string;

  @Input("name")
  name: string = 'dp';

  @Input("required")
  required: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  localeData;
  ngOnInit() {
    var locale = window.navigator.language;
    moment.locale(locale);
    this.localeData = moment.localeData();
    this.startDateFormat = `${this.placeholder ? this.placeholder + ' (' + this.localeData.longDateFormat('L').toLowerCase() + ')' : this.localeData.longDateFormat('L').toLowerCase()}`;
  }

  selectedDate: any;
  disabled = false;

  // Function to call when the date changes.
  onChange = (date?: Date) => { };

  // Function to call when the date picker is touched
  onTouched = () => { };

  writeValue(value: Date) {
    if (!value || value == null) {
      this.selectedDate = null;
      return;
    }
    this.selectedDate = {
      year: value.getFullYear(),
      month: value.getMonth()+1,
      day: value.getDate()
    }
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Write change back to parent
  onDateChange(value: Date) {
    if (!value || value == null) {
      this.selectedDate = null;
      this.onChange(null);
      return;
    }
    let momentDate = moment(value, this.localeData.longDateFormat('L'));
    let aDate = momentDate.toDate();
    this.onChange(aDate);
  }

  // Write change back to parent
  onDateSelect(value: any) {
    if (!value || value == null) {
      this.selectedDate = null;
      this.onChange(null);
      return;
    }
    this.onChange(new Date(value.year, value.month - 1, value.day));
  }

}
