import { TestBed } from '@angular/core/testing';

import { ApiCruiseService } from './api-cruise.service';

describe('ApiCruiseService', () => {
  let service: ApiCruiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCruiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
