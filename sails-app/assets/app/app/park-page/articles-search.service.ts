import { SearchService, SearchResults } from '../search/search.service';

export class ArticlesSearchService extends SearchService<ArticlesSearchResults> {
  baseUrl = '/api/v1/nps/articles/search/';
}

interface ArticlesSearchResults extends SearchResults {
  results: { data: object[] };
}
