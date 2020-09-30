import { TestBed } from '@angular/core/testing';

import { BreakersService } from './breakers.service';

describe('BreakersService', () => {
  let service: BreakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
