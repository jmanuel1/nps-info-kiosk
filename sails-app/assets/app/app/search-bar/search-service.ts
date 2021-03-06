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

  constructor(private http: HttpClient) { }

  search(parameters: Observable<SearchParameters>) {
    return parameters.pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .pipe(filter(({ term }) => term.length > 0)) // prevents invalid '?term='
      .pipe(switchMap(params => this.searchEntries(params)));
  }

  searchEntries(params) {
    return this.http
        .get<SearchResults>(this.baseUrl + this.constructQueryURL(params));
  }

  private constructQueryURL(parameters: SearchParameters) {
    const params = new URLSearchParams();
    for (const key of Object.keys(parameters)) {
      params.append(key, parameters[key]);
    }
    return '?' + params.toString();
  }
}

export interface SearchResults {
  results: {
    data: { fullName: string }[]
  };
}

export class SearchParameters {
  term: string;
  state: string;
  designation: string;

  constructor(parameters?: object) {
    const params = {term: '', state: '', designation: '', ...parameters};
    const { term, state, designation } = params;
    this.term = term;
    this.state = state;
    this.designation = designation;
  }
}
