import { TestBed, inject } from '@angular/core/testing';

import { ClienteAuthService } from './cliente-auth.service';

describe('ClienteAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteAuthService]
    });
  });

  it('should be created', inject([ClienteAuthService], (service: ClienteAuthService) => {
    expect(service).toBeTruthy();
  }));
});
