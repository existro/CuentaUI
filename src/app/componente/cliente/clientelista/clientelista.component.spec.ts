import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientelistaComponent } from './clientelista.component';

describe('ClientelistaComponent', () => {
  let component: ClientelistaComponent;
  let fixture: ComponentFixture<ClientelistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientelistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientelistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
