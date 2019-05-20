import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime,
         distinctUntilChanged,
         map,
         switchMap,
         filter } from 'rxjs/operators';

@Injectable()
export class SearchService {
  baseUrl = '/api/v1/nps/parks/search/';
  queryUrl = '?term=';

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .pipe(filter(term => term.length > 0)) // prevents invalid '?term='
      .pipe(switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http
        .get<SearchResults>(this.baseUrl + this.queryUrl + term);
  }
}

export interface SearchResults {
  results: object;
}
