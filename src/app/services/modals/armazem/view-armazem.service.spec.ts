import { TestBed } from '@angular/core/testing';

import { ViewArmazemService } from './view-armazem.service';

describe('ViewArmazemService', () => {
  let service: ViewArmazemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewArmazemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
