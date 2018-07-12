import { TestBed, inject } from '@angular/core/testing';

import { EncuestaSService } from './encuesta-s.service';

describe('EncuestaSService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncuestaSService]
    });
  });

  it('should be created', inject([EncuestaSService], (service: EncuestaSService) => {
    expect(service).toBeTruthy();
  }));
});
