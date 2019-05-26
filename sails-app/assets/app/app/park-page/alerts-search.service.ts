import { Injectable } from '@angular/core';
import { SearchService, SearchResults } from '../search/search.service';

export class AlertsSearchService extends SearchService<AlertsSearchResults> {
  baseUrl = '/api/v1/nps/alerts/search/';
}

interface AlertsSearchResults extends SearchResults {
  results: {data: object[]};
}
