import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from './visitor-center-service';

@Component({
  selector: 'app-park-result',
  templateUrl: './park-result.component.html',
  styleUrls: ['./park-result.component.css'],
  providers: [SearchService]
})
export class ParkResultComponent implements OnInit {
  @Input() park: Park;
  private centersResults: object;

  constructor(private searchService: SearchService) {

  }

  ngOnInit() {
    this.searchService.searchEntries({parkCode: this.park.parkCode}).subscribe((results) => {
      this.centersResults = results.results;
    });
  }

}

class Park {
  parkCode: string;
}
