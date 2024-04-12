import { TestBed } from '@angular/core/testing';

import { MotivoserviceService } from './motivoservice.service';

describe('MotivoserviceService', () => {
  let service: MotivoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
