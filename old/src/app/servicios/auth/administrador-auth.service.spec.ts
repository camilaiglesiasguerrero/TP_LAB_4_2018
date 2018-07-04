import { TestBed, inject } from '@angular/core/testing';

import { AdministradorAuthService } from './administrador-auth.service';

describe('AdministradorAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministradorAuthService]
    });
  });

  it('should be created', inject([AdministradorAuthService], (service: AdministradorAuthService) => {
    expect(service).toBeTruthy();
  }));
});
