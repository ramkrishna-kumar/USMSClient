import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationActivityListComponent } from './quotation-activity-list.component';

describe('QuotationActivityListComponent', () => {
  let component: QuotationActivityListComponent;
  let fixture: ComponentFixture<QuotationActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
