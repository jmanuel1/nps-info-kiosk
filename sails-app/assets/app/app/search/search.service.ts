import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
Superclass for services that interact with our search APIs.
 */
@Injectable()
export abstract class SearchService<Results = SearchResults> {
  abstract baseUrl: string;

  constructor(private http: HttpClient) { }

  searchEntries(params: SearchParameters): Observable<Results> {
    return this.http
        .get<Results>(this.baseUrl + this.constructQueryURL(params));
  }

  protected constructQueryURL(parameters: SearchParameters): string {
    const { parkCode } = parameters;
    const queryURL = `?parkCode=${parkCode}`;

    return queryURL;
  }
}

export interface SearchResults {
  results: { data: object[] };
}

export class SearchParameters {
  parkCode: string;

  constructor(parameters?: object) {
    const params = {parkCode: null, ...parameters};
    const { parkCode } = params;
    this.parkCode = parkCode;
  }
}
