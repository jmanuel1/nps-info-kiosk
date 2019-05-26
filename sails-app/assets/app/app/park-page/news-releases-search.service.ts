import { Injectable } from '@angular/core';
import { SearchService } from '../search/search.service';

export class NewsReleasesSearchService extends SearchService {
  baseUrl = '/api/v1/nps/news-releases/search/';
}
