import { Component, OnInit } from '@angular/core';
import { SearchService, SearchResults } from '../search/visitor-center-service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-visitor-center-page',
  templateUrl: './visitor-center-page.component.html',
  styleUrls: ['./visitor-center-page.component.css'],
  providers: [SearchService]
})
export class VisitorCenterPageComponent implements OnInit {
  visitorCenter: SearchResults['results']['data'][0];

  constructor(private service: SearchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.searchEntries({
          parkCode: params.get('parkCode'),
          id: params.get('id')
        }))
    ).subscribe(({results}) => {
      this.visitorCenter = results.data[0];
    });
  }

}
