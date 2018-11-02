// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApplicationConfig: {
    'API_URL': 'WEB_API_URL',
    'CLIENT_ID': 'APPLICATION_ID',
    'AUTHORITY': 'https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/',
    'REDIRECT_URI': 'http://localhost:4200/home',
    'SCOPES': ['user.read'],
    'SCOPES_WEB': ['WEB_API_SCOPE'],
    'SIGNALR_HUB': 'SignalRHub',
    'FUNCTION_APP_URL': 'FUNCTION_APP_URLFUNCTION_APP_URL'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
