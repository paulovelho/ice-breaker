import { TestBed } from '@angular/core/testing';

import { SqlbrowserService } from './sqlbrowser.service';

describe('SqlbrowserService', () => {
  let service: SqlbrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlbrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
