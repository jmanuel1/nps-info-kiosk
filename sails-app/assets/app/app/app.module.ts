import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
// TODO: Add autocomplete later
import { MatFormFieldModule,
         MatInputModule,
         MatListModule,
         MatIconModule,
         MatCardModule,
         MatExpansionModule } from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {
   SearchResultsComponent
 } from './search-results/search-results.component';
import { ParkResultComponent } from './park-result/park-result.component';
import {
  VisitorCenterListComponent
 } from './visitor-center-list/visitor-center-list.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ParkResultComponent,
    VisitorCenterListComponent
    SearchPageComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
