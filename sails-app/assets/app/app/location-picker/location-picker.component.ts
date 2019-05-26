import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { point, Coord, getCoord } from '@turf/turf';
import { LocationService } from './location.service';

declare let L; // from npmap.js/leaflet
declare global {
  interface Window {
    NPMap;
  }
}

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css'],
  providers: [LocationService]
})
export class LocationPickerComponent implements OnInit {

  isMapOpen: boolean;
  location: Coord;
  marker;
  // @Output() locationchange = new EventEmitter<Coord>();

  constructor(private locationService: LocationService) {

  }

  ngOnInit() {
    window.NPMap = {
      div: 'map',
      hooks: {
        init: (callback) => {
          this.marker = L.marker([0, 0]).addTo(window.NPMap.config.L);
          window.NPMap.config.L.on('click', (e) => this.setLocation(e));
          callback();
        }
      }
    };
    const s = document.createElement('script');
    s.src = 'https://www.nps.gov/lib/npmap.js/4.0.0/npmap-bootstrap.js';
    document.body.appendChild(s);
    // s.addEventListener('load', (event) => {
    //   this.marker = L.marker([0, 0]).addTo(NPMap.config.L);
    // });

  }

  toggleMap() {
    this.isMapOpen = !this.isMapOpen;
  }

  setLocation(event) {
    console.dir(event);
    this.location = point([event.latlng.lat, event.latlng.lng]);
    this.updateMarker(this.location);
    LocationService.nextLocation(this.location);
    // console.debug('location-picker emitted: ');
    // console.dir(this.location);
  }

  updateMarker(location: Coord) {
    this.marker.setLatLng(getCoord(location));
  }
}
