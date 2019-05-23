import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CampgroundsSearchService {
  baseUrl = '/api/v1/nps/campgrounds/search/';

  constructor(private http: HttpClient) { }

  searchEntries(params: CampgroundsSearchParameters): Observable<CampgroundsSearchResults> {
    return this.http
        .get<CampgroundsSearchResults>(this.baseUrl + this.constructQueryURL(params));
  }

  private constructQueryURL(parameters: CampgroundsSearchParameters): string {
    const { parkCode } = parameters;
    const queryURL = `?parkCode=${parkCode}`;

    return queryURL;
  }
}

export interface CampgroundsSearchResults {
  results: object;
}

export class CampgroundsSearchParameters {
  parkCode: string;

  constructor(parameters?: object) {
    const params = {parkCode: null, ...parameters};
    const { parkCode } = params;
    this.parkCode = parkCode;
  }
}
