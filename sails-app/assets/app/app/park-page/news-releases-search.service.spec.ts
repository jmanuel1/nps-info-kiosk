import { TestBed } from '@angular/core/testing';

import { NewsReleasesSearchService } from './news-releases-search.service';

describe('NewsReleasesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsReleasesSearchService = TestBed.get(NewsReleasesSearchService);
    expect(service).toBeTruthy();
  });
});
