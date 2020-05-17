import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderActivityListComponent } from './order-activity-list.component';

describe('OrderActivityListComponent', () => {
  let component: OrderActivityListComponent;
  let fixture: ComponentFixture<OrderActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
