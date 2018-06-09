import { TestBed, inject } from '@angular/core/testing';

import { EmpleadoAuthService } from './empleado-auth.service';

describe('EmpleadoAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoAuthService]
    });
  });

  it('should be created', inject([EmpleadoAuthService], (service: EmpleadoAuthService) => {
    expect(service).toBeTruthy();
  }));
});
