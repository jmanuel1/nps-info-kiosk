import { TestBed } from '@angular/core/testing';

import { AlertsSearchService } from './alerts-search.service';

describe('AlertsSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertsSearchService = TestBed.get(AlertsSearchService);
    expect(service).toBeTruthy();
  });
});
