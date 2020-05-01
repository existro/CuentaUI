import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaNewComponent } from './empresa-new.component';

describe('EmpresaNewComponent', () => {
  let component: EmpresaNewComponent;
  let fixture: ComponentFixture<EmpresaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
