import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaLstComponent } from './empresa-lst.component';

describe('EmpresaLstComponent', () => {
  let component: EmpresaLstComponent;
  let fixture: ComponentFixture<EmpresaLstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaLstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
