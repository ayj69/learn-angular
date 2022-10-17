import { TestBed } from '@angular/core/testing';

import { FetchbookService } from './fetchbook.service';

describe('FetchbookService', () => {
  let service: FetchbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
