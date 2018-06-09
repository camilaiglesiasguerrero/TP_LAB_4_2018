import { TestBed, inject } from '@angular/core/testing';

import { EncargadoAuthService } from './encargado-auth.service';

describe('EncargadoAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncargadoAuthService]
    });
  });

  it('should be created', inject([EncargadoAuthService], (service: EncargadoAuthService) => {
    expect(service).toBeTruthy();
  }));
});
