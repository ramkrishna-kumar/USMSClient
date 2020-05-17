import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEditorComponent } from './college-editor.component';

describe('CollegeEditorComponent', () => {
  let component: CollegeEditorComponent;
  let fixture: ComponentFixture<CollegeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
