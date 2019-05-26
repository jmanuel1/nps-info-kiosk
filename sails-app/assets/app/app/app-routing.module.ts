import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { ParkPageComponent } from './park-page/park-page.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchPageComponent,
    data: {
      title: 'National Parks Kiosk'
    }
  },
  {
    path: 'park/:parkCode',
    component: ParkPageComponent
  },
  // default route
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
