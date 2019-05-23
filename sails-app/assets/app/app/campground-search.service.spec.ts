import 'jasmine';

import { TestBed } from '@angular/core/testing';

import { CampgroundsSearchService } from './campground-search.service';

describe('CampgroundsSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CampgroundsSearchService ]
  }));

  it('should be created', () => {
    const service: CampgroundsSearchService = TestBed.get(CampgroundsSearchService);
    expect(service).toBeTruthy();
  });
});
