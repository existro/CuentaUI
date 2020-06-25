import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilidadLstComponent } from './contabilidad-lst.component';

describe('ContabilidadLstComponent', () => {
  let component: ContabilidadLstComponent;
  let fixture: ComponentFixture<ContabilidadLstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContabilidadLstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContabilidadLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
