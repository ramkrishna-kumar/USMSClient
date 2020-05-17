import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEditorComponent } from './supplier-editor.component';

describe('SupplierEditorComponent', () => {
  let component: SupplierEditorComponent;
  let fixture: ComponentFixture<SupplierEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
