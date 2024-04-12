import { TestBed } from '@angular/core/testing';

import { NfdserviceService } from './nfdservice.service';

describe('NfdserviceService', () => {
  let service: NfdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NfdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
