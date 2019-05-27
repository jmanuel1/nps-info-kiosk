import { TestBed } from '@angular/core/testing';

import { PeopleSearchService } from './people-search.service';

describe('PeopleSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeopleSearchService = TestBed.get(PeopleSearchService);
    expect(service).toBeTruthy();
  });
});
