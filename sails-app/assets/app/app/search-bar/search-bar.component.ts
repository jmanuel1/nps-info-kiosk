import { Component, OnInit } from '@angular/core';
import { SearchService, SearchResults } from './search-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [SearchService]
})
export class SearchBarComponent implements OnInit {
  results: object;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe((results: SearchResults) => {
        this.results = results.results;
      });
  }

  ngOnInit() {
  }

}
