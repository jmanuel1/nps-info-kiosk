import { TestBed } from '@angular/core/testing';

import { LessonPlansSearchService } from './lesson-plans-search.service';

describe('LessonPlansSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonPlansSearchService = TestBed.get(LessonPlansSearchService);
    expect(service).toBeTruthy();
  });
});
