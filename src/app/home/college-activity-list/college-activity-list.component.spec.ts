import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeActivityListComponent } from './college-activity-list.component';

describe('CollegeActivityListComponent', () => {
  let component: CollegeActivityListComponent;
  let fixture: ComponentFixture<CollegeActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
