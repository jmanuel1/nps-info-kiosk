import { Component, OnInit, NgZone } from '@angular/core';
import { point, Coord, getCoord } from '@turf/turf';
import { LocationService } from './location.service';
// NOTE: Since the leaflet npm package is not actually installed, this import
// must be used ONLY for type information so that Typescript erases at in
// runtime. See https://www.typescriptlang.org/docs/handbook/modules.html
// "Optional Module Loading and Other Advanced Loading Scenarios"
import * as Leaflet from 'leaflet';

declare const L: typeof Leaflet; // from npmap.js/leaflet
declare global {
  interface Window {
    NPMap: {
      div: string,
      hooks: object,
      config?: { L: Leaflet.Map },
      locateControl: boolean
    };
  }
}

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {

  isMapOpen: boolean;
  location: Coord;
  marker: Leaflet.Marker;

  constructor(private zone: NgZone) {

  }

  ngOnInit() {
    window.NPMap = {
      div: 'map',
      hooks: {
        init: (callback: () => void) => {
          this.marker = L.marker([0, 0]).addTo(window.NPMap.config.L);
          window.NPMap.config.L.on('click', (e: Leaflet.LeafletMouseEvent) =>
            this.setLocation(e));
          // TODO: Don't close map on mouseout when asking for geolocate
          // permission
          window.NPMap.config.L.on('mouseout', () => this.closeMap());
          window.NPMap.config.L.on('locationfound', (e: Leaflet.LocationEvent) =>
            this.setLocation(e));
          window.NPMap.config.L.on('locationerror', () =>
            this.onGeolocateFail());
          callback();
        }
      },
      locateControl: true
    };
    const s = document.createElement('script');
    s.src = 'https://www.nps.gov/lib/npmap.js/4.0.0/npmap-bootstrap.js';
    document.body.appendChild(s);
  }

  toggleMap() {
    this.isMapOpen = !this.isMapOpen;
  }

  closeMap() {
    this.isMapOpen = false;
    // force change detection
    this.zone.run(() => null);
  }

  setLocation(event: Leaflet.LeafletMouseEvent | Leaflet.LocationEvent) {
    console.dir(event);
    this.location = point([event.latlng.lat, event.latlng.lng]);
    this.updateMarker(this.location);
    LocationService.nextLocation(this.location);
  }

  updateMarker(location: Coord) {
    const coord = getCoord(location);
    this.marker.setLatLng([coord[0], coord[1]]);
  }

  onGeolocateFail() {
    // TODO: Use proper error notification
    alert('Error retrieving your location.');
  }
}
