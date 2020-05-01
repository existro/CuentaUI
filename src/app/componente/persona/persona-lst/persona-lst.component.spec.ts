import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaLstComponent } from './persona-lst.component';

describe('PersonaLstComponent', () => {
  let component: PersonaLstComponent;
  let fixture: ComponentFixture<PersonaLstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaLstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
