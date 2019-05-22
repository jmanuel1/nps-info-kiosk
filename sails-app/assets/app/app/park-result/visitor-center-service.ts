import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { debounceTime,
         distinctUntilChanged,
         map,
         switchMap,
         filter } from 'rxjs/operators';

@Injectable()
export class SearchService {
  baseUrl = '/api/v1/nps/visitorcenters/search/';

  constructor(private http: HttpClient) { }

  searchEntries(params: SearchParameters): Observable<SearchResults> {
    return this.http
        .get<SearchResults>(this.baseUrl + this.constructQueryURL(params));
  }

  private constructQueryURL(parameters: SearchParameters): string {
    const { parkCode } = parameters;
    const queryURL = `?parkCode=${parkCode}`;

    return queryURL;
  }
}

export interface SearchResults {
  results: {
    data: {
      addresses: {
        physical: {
          line1: string,
          line2: string,
          line3: string,
        }
      },
      name: string
    }[]
  };
}

export class SearchParameters {
  parkCode: string;

  constructor(parameters?: object) {
    const params = {parkCode: null, ...parameters};
    const { parkCode } = params;
    this.parkCode = parkCode;
  }
}
