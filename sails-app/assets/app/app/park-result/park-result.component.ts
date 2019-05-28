import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from './visitor-center-service';
import { CampgroundsSearchService } from '../campground-search.service';

@Component({
  selector: 'app-park-result',
  templateUrl: './park-result.component.html',
  styleUrls: ['./park-result.component.css'],
  providers: [SearchService, CampgroundsSearchService]
})
export class ParkResultComponent implements OnInit {
  @Input() park: Park;
  centersResults: object;
  campgroundsResults: object;

  constructor(
    private centersSearchService: SearchService,
    private campgroundsSearchService: CampgroundsSearchService
  ) {
  }

  ngOnInit() {
    this.centersSearchService.searchEntries({parkCode: this.park.parkCode})
      .subscribe((results) => {
        this.centersResults = results.results;
      });
    this.campgroundsSearchService.searchEntries({parkCode: this.park.parkCode})
      .subscribe((results) => {
        this.campgroundsResults = results.results;
      });
  }

}

class Park {
  parkCode: string;
  fullName: string;
}
