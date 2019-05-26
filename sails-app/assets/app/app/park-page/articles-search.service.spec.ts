import { TestBed } from '@angular/core/testing';

import { ArticlesSearchService } from './articles-search.service';

describe('ArticlesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlesSearchService = TestBed.get(ArticlesSearchService);
    expect(service).toBeTruthy();
  });
});
