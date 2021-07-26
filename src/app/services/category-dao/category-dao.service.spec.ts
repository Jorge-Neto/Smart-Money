import { TestBed } from '@angular/core/testing';

import { CategoryDAOService } from './category-dao.service';

describe('CategoryDAOService', () => {
  let service: CategoryDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
