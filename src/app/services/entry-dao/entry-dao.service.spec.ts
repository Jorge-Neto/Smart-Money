import { TestBed } from '@angular/core/testing';

import { EntryDAOService } from './entry-dao.service';

describe('EntryDAOService', () => {
  let service: EntryDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
