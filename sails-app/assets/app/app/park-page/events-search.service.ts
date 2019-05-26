import { Injectable } from '@angular/core';
import { SearchService } from '../search/search.service';

export class EventsSearchService extends SearchService {
  baseUrl = '/api/v1/nps/events/search/';
}
