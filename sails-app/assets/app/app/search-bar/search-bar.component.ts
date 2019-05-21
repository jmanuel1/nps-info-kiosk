import { Component, OnInit } from '@angular/core';
import { SearchService,
         SearchResults,
         SearchParameters } from './search-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [SearchService]
})
export class SearchBarComponent implements OnInit {
  results: object;
  searchParameters$ = new SearchSubject();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchParameters$)
      .subscribe((results: SearchResults) => {
        this.results = results.results;
      });
  }

  ngOnInit() {
  }

}

class SearchSubject extends Subject<SearchParameters> {
  private previous = new SearchParameters();

  nextSearchTerm(term: string) {
    this.next({...this.previous, term});
    this.previous = {...this.previous, term};
  }

  nextState(state: string) {
    const current = {...this.previous, state};
    this.next(current);
    this.previous = current;
  }

  nextDesignation(designation: string) {
    const current = {...this.previous, designation};
    this.next(current);
    this.previous = current;
  }
}
