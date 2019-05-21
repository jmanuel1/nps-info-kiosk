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
         MatIconModule } from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {
   SearchResultsComponent
 } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
