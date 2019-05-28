import { Component, OnInit, NgZone } from '@angular/core';
import { point, Coord, getCoord } from '@turf/turf';
import { LocationService } from './location.service';

declare let L: any; // from npmap.js/leaflet
declare global {
  interface Window {
    NPMap: any;
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
  marker: any; // TODO: leaflet typings?

  constructor(private zone: NgZone) {

  }

  ngOnInit() {
    window.NPMap = {
      div: 'map',
      hooks: {
        init: (callback: () => void) => {
          this.marker = L.marker([0, 0]).addTo(window.NPMap.config.L);
          window.NPMap.config.L.on('click', (e: any) => this.setLocation(e));
          window.NPMap.config.L.on('mouseout', () => this.closeMap());
          callback();
        }
      }
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

  setLocation(event: any) {
    console.dir(event);
    this.location = point([event.latlng.lat, event.latlng.lng]);
    this.updateMarker(this.location);
    LocationService.nextLocation(this.location);
  }

  updateMarker(location: Coord) {
    this.marker.setLatLng(getCoord(location));
  }
}
