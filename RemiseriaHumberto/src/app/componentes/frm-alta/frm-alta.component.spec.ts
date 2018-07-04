import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmAltaComponent } from './frm-alta.component';

describe('FrmAltaComponent', () => {
  let component: FrmAltaComponent;
  let fixture: ComponentFixture<FrmAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
