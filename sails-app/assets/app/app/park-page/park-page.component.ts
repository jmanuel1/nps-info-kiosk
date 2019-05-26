import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchService, SearchResults } from '../search-bar/search-service';
import { AlertsSearchService } from './alerts-search.service';
import { ArticlesSearchService } from './articles-search.service';
import { EventsSearchService } from './events-search.service';
import { NewsReleasesSearchService } from './news-releases-search.service';

@Component({
  selector: 'app-park-page',
  templateUrl: './park-page.component.html',
  styleUrls: ['./park-page.component.css'],
  providers: [
    SearchService,
    AlertsSearchService,
    ArticlesSearchService,
    EventsSearchService,
    NewsReleasesSearchService,
  ]
})
export class ParkPageComponent implements OnInit {
  park$: Observable<SearchResults>;
  park: { fullName: string; parkCode?: string } = { fullName: '' };
  alerts: object[];
  articles: object[];
  events: object[];
  newsReleases: object[];

  constructor(
    private route: ActivatedRoute,
    private service: SearchService,
    private alertsSearchService: AlertsSearchService,
    private articlesSearchService: ArticlesSearchService,
    private eventsSearchService: EventsSearchService,
    private newsReleasesSearchService: NewsReleasesSearchService,
  ) {
  }

  ngOnInit() {
    this.park$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.searchEntries({
          parkCode: params.get('parkCode')
        }))
    );
    this.park$.subscribe(({ results }) => {
      this.park = results.data[0];
      // TODO: This code is WET
      this.alertsSearchService.searchEntries({ parkCode: this.park.parkCode }).subscribe(({ results: alertsResults }) => {
        this.alerts = alertsResults.data;
      });
      this.articlesSearchService.searchEntries({ parkCode: this.park.parkCode }).subscribe(({ results: articlesResults }) => {
        this.articles = articlesResults.data;
      });
      this.eventsSearchService.searchEntries({ parkCode: this.park.parkCode }).subscribe(({ results: eventsResults }) => {
        this.events = eventsResults.data;
      });
      this.newsReleasesSearchService.searchEntries({ parkCode: this.park.parkCode }).subscribe(({ results: newsReleasesResults }) => {
        this.newsReleases = newsReleasesResults.data;
      });
    });
  }

}
