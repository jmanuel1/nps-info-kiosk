import { Injectable } from '@angular/core';
import { SearchService } from '../search/search.service';

export class PeopleSearchService extends SearchService {
  baseUrl = '/api/v1/nps/people/search';
}
