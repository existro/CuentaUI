import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilidadNewComponent } from './contabilidad-new.component';

describe('ContabilidadNewComponent', () => {
  let component: ContabilidadNewComponent;
  let fixture: ComponentFixture<ContabilidadNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContabilidadNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContabilidadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
