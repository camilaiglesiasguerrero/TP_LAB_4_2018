import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServComponent } from './tipo-serv.component';

describe('TipoServComponent', () => {
  let component: TipoServComponent;
  let fixture: ComponentFixture<TipoServComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoServComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
