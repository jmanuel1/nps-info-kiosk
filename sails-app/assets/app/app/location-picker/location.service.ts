import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Coord, point } from '@turf/turf';

@Injectable()
export class LocationService {
  private static location = new Subject<Coord>();
  private static currentLoc: Coord = point([0, 0]);

  constructor() {
  }

  static nextLocation(location: Coord) {
    this.currentLoc = location;
    this.location.next(location);
  }

  static subscribeToLocation(callback: (loc: Coord) => void) {
    this.location.subscribe(callback);
  }

  static get currentLocation(): Coord {
    return this.currentLoc;
  }
}
