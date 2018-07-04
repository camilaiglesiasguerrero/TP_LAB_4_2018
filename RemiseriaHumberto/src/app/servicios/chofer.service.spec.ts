import { TestBed, inject } from '@angular/core/testing';

import { ChoferService } from './chofer.service';

describe('ChoferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoferService]
    });
  });

  it('should be created', inject([ChoferService], (service: ChoferService) => {
    expect(service).toBeTruthy();
  }));
});
