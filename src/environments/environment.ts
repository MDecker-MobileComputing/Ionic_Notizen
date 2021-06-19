// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * Konfiguration nach https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCmfcPnk-cVkLd6sUe4Zr1tpJtA9M_3lKE",
    authDomain: "notizen-mit-firestore.firebaseapp.com",
    projectId: "notizen-mit-firestore",
    storageBucket: "notizen-mit-firestore.appspot.com",
    messagingSenderId: "1004777408815",
    appId: "1:1004777408815:web:91d6644d2207869bd579da"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
