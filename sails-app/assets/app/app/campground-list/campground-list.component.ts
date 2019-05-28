import { Component,
        OnInit,
        Input,
        ChangeDetectorRef,
        NgZone } from '@angular/core';
import { point, distance, Coord } from '@turf/turf';
import { LocationService } from '../location-picker/location.service';

@Component({
  selector: 'app-campground-list',
  templateUrl: './campground-list.component.html',
  styleUrls: ['./campground-list.component.css']
})
export class CampgroundListComponent implements OnInit {
  @Input() campgrounds: Campground[];
  private userLoc: Coord;

  constructor(private ref: ChangeDetectorRef, private zone: NgZone) {
    LocationService.subscribeToLocation((loc: Coord) => {
      this.userLocation = loc;
    });
  }

  ngOnInit() {
    // make sure to sort if user selected a location before this view was
    // initialized
    this.userLocation = LocationService.currentLocation;
  }

  private campgroundPoint(campground: Campground) {
    const latLongString = campground.latLong;
    if (!latLongString) {
      return point([0, 0]); // null island if we don't have coordinates
    }

    // The keys in latLongString aren't in quotes, so we can't immediately
    // JSON.parse
    const latLongJSON =
      latLongString.replace('lat', '"lat"').replace('lng', '"lng"');
    const originalLatLong = JSON.parse(latLongJSON);
    return point([ originalLatLong.lat, originalLatLong.lng ]);
  }

  private set userLocation(location: Coord) {
    this.userLoc = location;
    this.sortCampgroundsByDistance();
    this.ref.markForCheck();
    // for some reason, I can't get the view doesn't update automatically, so
    // this line is used to force Angular to update the view
    this.zone.run(() => null);
  }

  private sortCampgroundsByDistance() {
    // Sort the campgrounds by distance to a user-set location, ascending
    this.campgrounds.sort((campgroundA, campgroundB) => {
      const pointA = this.campgroundPoint(campgroundA);
      const pointB = this.campgroundPoint(campgroundB);
      const origin = this.userLoc || point([0, 0]);
      const distanceToA = distance(origin, pointA);
      const distanceToB = distance(origin, pointB);
      return distanceToA - distanceToB;
    });
  }
}

interface Campground {
  latLong: string;
}
