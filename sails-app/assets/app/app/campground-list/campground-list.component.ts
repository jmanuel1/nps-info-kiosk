import { Component,
        OnInit,
        Input,
        ChangeDetectorRef,
        NgZone } from '@angular/core';
import { point, distance, Coord } from '@turf/turf';

@Component({
  selector: 'app-campground-list',
  templateUrl: './campground-list.component.html',
  styleUrls: ['./campground-list.component.css']
})
export class CampgroundListComponent implements OnInit {
  @Input() campgrounds: Campground[];
  private userLoc: Coord;

  constructor(private ref: ChangeDetectorRef, private zone: NgZone) {
  }

  ngOnInit() {
  }

  private campgroundPoint(campground: Campground) {
    const latLongString = campground.latLong;
    if (!latLongString) {
      return point([0, 0]); // null island if we don't have coordinates
    }

    // The keys in latLongString aren't in quotes, so we can't immediately
    // JSON.parse
    const latLongJSON = latLongString.replace('lat', '"lat"').replace('lng', '"lng"');
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

  }
}

interface Campground {
  latLong: string;
}
