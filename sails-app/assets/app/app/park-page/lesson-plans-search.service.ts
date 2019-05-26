import { SearchService } from '../search/search.service';

export class LessonPlansSearchService extends SearchService {
  baseUrl = '/api/v1/nps/lesson-plans/search/';
}
