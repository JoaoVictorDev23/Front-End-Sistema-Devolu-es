import { TestBed } from '@angular/core/testing';

import { ArmazemCadastrarService } from './armazem-cadastrar.service';

describe('ArmazemCadastrarService', () => {
  let service: ArmazemCadastrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmazemCadastrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
