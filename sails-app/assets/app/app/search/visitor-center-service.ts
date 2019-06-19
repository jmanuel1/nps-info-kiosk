import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SearchService as BaseSearchService } from './search.service';

@Injectable()
export class SearchService extends BaseSearchService<SearchResults> {
  baseUrl = '/api/v1/nps/visitorcenters/search/';

  searchEntries(params: SearchParameters) {
    return super.searchEntries(params).pipe(map(({results}) => {
      const filteredCenters = results.data.filter((center) => {
        if (params.id) {
          return center.id === params.id;
        }
        return true;
      });
      return {results: {data: filteredCenters}};
    }));
  }
  protected constructQueryURL(parameters: SearchParameters): string {
    const { parkCode } = parameters;
    const queryURL = `?parkCode=${parkCode}`;

    return queryURL;
  }
}

export interface SearchResults {
  results: {
    data: {
      addresses: {
        // TODO: address interface
        physical: {
          line1: string,
          line2: string,
          line3: string,
          city: string,
          stateCode: string,
          postalCode: string
        },
        mailing: {
          line1: string,
          line2: string,
          line3: string,
          city: string,
          stateCode: string,
          postalCode: string
        }
      },
      name: string,
      id: string,
      directionsInfo: string;
    }[]
  };
}

export class SearchParameters {
  parkCode: string;
  id?: string;

  constructor(parameters?: object) {
    const params = {parkCode: null, id: null, ...parameters};
    const { parkCode, id } = params;
    this.parkCode = parkCode;
    this.id = id;
  }
}
