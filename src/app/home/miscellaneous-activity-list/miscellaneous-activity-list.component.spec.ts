import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousActivityListComponent } from './miscellaneous-activity-list.component';

describe('MiscellaneousActivityListComponent', () => {
  let component: MiscellaneousActivityListComponent;
  let fixture: ComponentFixture<MiscellaneousActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
