# National Parks Service Information Kiosk

## Development

This is a [Sails v1](https://sailsjs.com) application.

### Starting the app locally

In the `sails-app` directory, run:

```batchfile
set NPS_API_KEY=<your API key>
yarn run start
```

### Development with the service worker

**Important notes:**

If you enable offline-mode in Chromium-based Dev Tools and refresh the page,
you may get a 504 error. To mitigate, navigate away from the app in the same
tab, then navigate back. The service worker should work then. For more info on
why this happens, see [this comment on an `angular/angular`
issue](https://github.com/angular/angular/issues/21636#issuecomment-372755074).

### Testing PWA installability

You can test that the app can be installed on a desktop computer by using
Chrome. The install option can be found under the Chrome menu > Install
National Parks Kiosk.

### PWA Lighthouse audit

<!-- TODO -->
The app currently does not redirect HTTP traffic to HTTPS.

### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)


### Version info

This app was originally generated on Fri May 17 2019 23:37:37 GMT-0700 (US
Mountain Standard Time) using Sails v1.2.2.

<!-- Internally, Sails used
[`sails-generate@1.16.8`](https://github.com/balderdashy/sails-generate/tree/v1.16.8/lib/core-generators/new).
-->


This project's boilerplate is based on an expanded seed app provided by the
[Sails core team](https://sailsjs.com/about).


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI
(command-line interface).  This CLI version is _environment-specific_ rather
than app-specific, thus over time, as a project's dependencies are upgraded or
the project is worked on by different developers on different computers using
different versions of Node.js, the Sails dependency in its package.json file
may differ from the globally-installed Sails CLI release it was originally
generated with. (Be sure to always check out the relevant
[upgrading guides](https://sailsjs.com/upgrading) before upgrading the version
of Sails used by your app. If you're stuck,
[get help here](https://sailsjs.com/support).)
-->

## Attributions

### Libraries/Frameworks

- Turf.js
- [NPMap.js](https://www.nps.gov/lib/npmap.js/4.0.0/npmap-bootstrap.js) (which
  is itself based on Leaflet)
- Angular Material
- Angular
- [Sails](https://github.com/balderdashy/sails)
- [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [ng-inline-svg](https://github.com/arkon/ng-inline-svg)
- [NPS Symbols Library](https://github.com/nationalparkservice/symbol-library)

### Fonts

- [Roboto](https://github.com/google/roboto)
- [Material Design Icons](https://github.com/google/material-design-icons)

### Data Sources

- [National Parks Service data API](https://www.nps.gov/subjects/developer/index.htm)
- [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) for
  their map tiles
    - (NPS Park Tiles aren't used because [they don't allow that](https://github.com/nationalparkservice/park-tiles/wiki/Frequently-Asked-Questions#using-park-tiles).)
