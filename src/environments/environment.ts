// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The board-list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDvdutjeLYl4PY0swmUAs76aJ-UUMX2rfY',
    authDomain: 'goals-booster.firebaseapp.com',
    databaseURL: 'https://goals-booster.firebaseio.com',
    projectId: 'goals-booster',
    storageBucket: 'goals-booster.appspot.com',
    messagingSenderId: '749295842606'
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
