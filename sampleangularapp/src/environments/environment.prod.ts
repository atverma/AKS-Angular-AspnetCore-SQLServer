export const environment = {
  production: true,
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
