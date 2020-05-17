import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, EventEmitter, Input, Output, forwardRef, ViewEncapsulation  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { TypeaheadItem, ITypeaheadCollection, TypeaheadCollection, ITypeaheadImages } from './utils';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseControlValueAccessor } from '../../miscellaneous/baseControlValueAccessor';

@Component({
  selector: 'custom-typeahead',
  templateUrl: './custom-typeahead.component.html',
  styleUrls: ['./custom-typeahead.component.css'],
  providers: [    
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomTypeaheadComponent)
    }
  ]
})
export class CustomTypeaheadComponent extends BaseControlValueAccessor<string> implements OnInit {
  
  private isSaving = false;
  private directoryId: string;
  dataItemsInternal: TypeaheadCollection
   
  @Input("dataItems")
  public set dataItems(data: TypeaheadCollection) {
    this.dataItemsInternal = data;
    if (data && this._value && !this.lastIdValue) {
      this.lastIdValue = this._value;
      this.instance.writeValue(this.lastIdValue);
    }
  }   

  @Input("placeholderString")
  placeholderString: string
  
  @Input("idFieldName")
  idFieldName: string

  @Input("isEditor")
  isEditor: boolean = false

  @Input("disabled")
  isDisabled: boolean = false

  @Input("name")
  name: string

  @Input("placement")
  placement: string = "bottom-left bottom-right top-left top-right"
 
  @Output() selected = new EventEmitter<string>();
  
  lastIdValue: string = null;  

  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
    super();
  }  

  updateIdValue() {
    //let ctrl = this.parentForm.get(this.idFieldName);
    let user = this.dataItemsInternal.Item(this._value);
    if (!user) {
      user = this.dataItemsInternal.Values().find(u => u.displayName == this._value);
    }
    this.lastIdValue = user ? user.id : this.lastIdValue;
    //this.parentForm.patchValue({ [this.idFieldName]: this.lastIdValue });
    this.value = this.lastIdValue;
    this.selected.emit(this.lastIdValue);
  }

  onBlur() {
    //let ctrl = this.parentForm.get(this.idFieldName);
    if (this._value) {
      if (this.isEditor) {
        this.lastIdValue = this._value;
      }
      else {
        if (this.instance.isPopupOpen()) {
          let users = this.dataItemsInternal.Values().filter(v => v.displayName.toLowerCase().indexOf(this._value.toLowerCase()) > -1);
          if (users.length > 0) {
            this.lastIdValue = users[0].id;
          }
          timer(100).subscribe(val => this.updateIdValue());
          return;
        }
        else {
          let user = this.dataItemsInternal.Item(this._value);
          if (!user) {
            user = this.dataItemsInternal.Values().find(u => u.displayName == this._value);
          }
          this.lastIdValue = user ? user.id : this.lastIdValue;
          //this.parentForm.patchValue({ [this.idFieldName]: this.lastIdValue });
          this.value = this.lastIdValue;
        }
      }
    }
    else {
      this.lastIdValue = null;
      //this.parentForm.patchValue({ [this.idFieldName]: null });
      this.value = this.lastIdValue;
    }
    this.selected.emit(this.lastIdValue);    
  }  

  ngOnInit() {    
  }  

  @ViewChild('instance', { static: true })
  instance: NgbTypeahead;

  public model: any;

  focus$ = new Subject<string>();

  click$ = new Subject<string>();

  clickSupporter(event: any) {
    this.click$.next(event);
  }

  searchSupporter = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.dataItemsInternal.SortedValues
        : this.dataItemsInternal.SortedValues.filter(v => this.contains(v.displayName, term))).map(m => m.id))
    );
  }

  contains(v1: string, v2: string) {
    if (v1 && v2) {
      try {
        return v1.toLowerCase().indexOf(v2.toLowerCase()) > -1;
      }
      catch {
        return false;
      }
    }
    return false;
  }

  selectedItem(event) {
    this.lastIdValue = event.item;
    this.selected.emit(this.lastIdValue);
  }

  keydown(event: KeyboardEvent) {
    /*if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.onBlur();
    }*/
  }

  formatMatches = (value: string) => {
    if (!this.dataItemsInternal) {
      return '';
    }
    let user = this.dataItemsInternal.Item(value);    
    return user ? user.displayName : '';
  }

  getDataItem = (value: string) => {
    if (!this.dataItemsInternal) {
      return null;
    }
    return this.dataItemsInternal.Item(value);    
  }

  getImageUrl = (imageUrl: string) => {
    if (!this.dataItemsInternal) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.dataItemsInternal.GetImageUrl(imageUrl));
  }
}
