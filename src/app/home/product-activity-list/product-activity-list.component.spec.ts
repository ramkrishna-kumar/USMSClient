import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActivityListComponent } from './product-activity-list.component';

describe('ProductActivityListComponent', () => {
  let component: ProductActivityListComponent;
  let fixture: ComponentFixture<ProductActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
