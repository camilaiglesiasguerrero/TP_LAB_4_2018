import { TestBed, inject } from '@angular/core/testing';

import { EncargadoService } from './encargado.service';

describe('EncargadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncargadoService]
    });
  });

  it('should be created', inject([EncargadoService], (service: EncargadoService) => {
    expect(service).toBeTruthy();
  }));
});
