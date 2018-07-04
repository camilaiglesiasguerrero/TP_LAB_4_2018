import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NexoComponent } from './nexo.component';

describe('NexoComponent', () => {
  let component: NexoComponent;
  let fixture: ComponentFixture<NexoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NexoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
