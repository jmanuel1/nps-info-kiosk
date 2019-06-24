import { Component, OnInit, NgZone } from '@angular/core';
import { point, Coord, getCoord } from '@turf/turf';
import { LocationService } from './location.service';
import {MatDialog, MatDialogRef} from '@angular/material';
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

  isMapOpen = false;
  location: Coord;
  marker: Leaflet.Marker;
  private dialogRef: MatDialogRef<MapDialogComponent>;

  constructor(private zone: NgZone, private mapDialog: MatDialog) {

  }

  ngOnInit() {

  }

  toggleMap() {
    this.isMapOpen = !this.isMapOpen;

    if (this.isMapOpen) {
      this.openMap();
    } else {
      this.dialogRef.close();
    }
  }

  openMap() {
    this.isMapOpen = true;

    const dialogRef = this.mapDialog.open(MapDialogComponent);
    // set the width of the dialog's panel so that the map is sized correctly
    dialogRef.addPanelClass('width-100-percent');
    dialogRef.afterOpened().subscribe(async () => {
      await this.instantiateMap();
      const map = window.NPMap.config.L;
      // this line is needed to get the map tiles to render correctly since the
      // map is contained in a panel that originally had no set width
      L.Util.requestAnimFrame(() => {
        map.invalidateSize();
      }, map, false);
    });
    dialogRef.afterClosed().subscribe(() => this.afterCloseMap());
    this.dialogRef = dialogRef;
  }

  instantiateMap() {
    return new Promise((resolve) => {
      window.NPMap = {
        div: 'map',
        hooks: {
          init: (callback: () => void) => {
            this.marker = L.marker([0, 0]).addTo(window.NPMap.config.L);
            window.NPMap.config.L.on('click', (e: Leaflet.LeafletMouseEvent) =>
              this.setLocation(e));
            window.NPMap.config.L.on(
              'locationfound',
              (e: Leaflet.LocationEvent) =>
                this.setLocation(e));
            window.NPMap.config.L.on('locationerror', () =>
              this.onGeolocateFail());

            callback();

            this.removeAllTileLayers(window.NPMap.config.L);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(window.NPMap.config.L);
            resolve();
          }
        },
        locateControl: true
      };
      const s = document.createElement('script');
      // NOTE: this is not cached by the service worker to avoid a CORS error
      s.src = 'https://www.nps.gov/lib/npmap.js/4.0.0/npmap-bootstrap.js';
      document.body.appendChild(s);
    });
  }

  removeAllTileLayers(map: Leaflet.Map) {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
  }

  afterCloseMap() {
    this.isMapOpen = false;
    // force change detection
    this.zone.run(() => null);
  }

  setLocation(event: Leaflet.LeafletMouseEvent | Leaflet.LocationEvent) {
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

@Component({
  selector: 'app-location-picker-map-dialog',
  template: `
    <mat-dialog-content>
      <div id="map"></div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="">Close</button>
    </mat-dialog-actions>`,
  styles: [
    `
    /*:host, * {
      width: 100%;
      height: 100%;
    }*/

    #map {
      width: inherit;
      height: 632px;
    }

    mat-dialog-content {
      position: relative;
    }`]
})
export class MapDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MapDialogComponent>) {

  }

  ngOnInit() {

  }
}
