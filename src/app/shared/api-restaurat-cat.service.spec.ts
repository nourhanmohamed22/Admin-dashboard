import { TestBed } from '@angular/core/testing';

import { ApiRestauratCatService } from './api-restaurat-cat.service';

describe('ApiRestauratCatService', () => {
  let service: ApiRestauratCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRestauratCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
