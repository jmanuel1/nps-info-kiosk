import { SearchService } from '../search/search.service';

export class PlacesSearchService extends SearchService {
  baseUrl = '/api/v1/nps/places/search/';
}
