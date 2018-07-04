import { TestBed, inject } from '@angular/core/testing';

import { ArchivoUsuarioService } from './archivo-usuario.service';

describe('ArchivoUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivoUsuarioService]
    });
  });

  it('should be created', inject([ArchivoUsuarioService], (service: ArchivoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
