import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { MatFormFieldModule,
         MatInputModule,
         MatListModule,
         MatIconModule,
         MatCardModule,
         MatExpansionModule,
         MatButtonModule,
         MatTabsModule,
         MatAutocompleteModule,
         MatSnackBarModule } from '@angular/material';

import { InlineSVGModule } from 'ng-inline-svg';

import { SearchBarComponent } from './search-bar/search-bar.component';
import {
  SearchResultsComponent
} from './search-results/search-results.component';
import { ParkResultComponent } from './park-result/park-result.component';
import {
  VisitorCenterListComponent
 } from './visitor-center-list/visitor-center-list.component';
import {
  CampgroundListComponent
} from './campground-list/campground-list.component';
import {
  LocationPickerComponent
} from './location-picker/location-picker.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ParkPageComponent } from './park-page/park-page.component';
import {
  TitleListCardComponent
} from './title-list-card/title-list-card.component';
import { NpsSymbolComponent } from './nps-symbol/nps-symbol.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IosInstallComponent } from './ios-install/ios-install.component';
import { VisitorCenterPageComponent } from './visitor-center-page/visitor-center-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ParkResultComponent,
    VisitorCenterListComponent,
    CampgroundListComponent,
    LocationPickerComponent,
    SearchPageComponent,
    ParkPageComponent,
    TitleListCardComponent,
    NpsSymbolComponent,
    IosInstallComponent,
    VisitorCenterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [IosInstallComponent]
})
export class AppModule { }
