import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Logger, LogLevel } from 'msal';
import {configProvider} from './configProvider';

// https://www.npmjs.com/package/react-aad-msal
// Msal Configurations
const config = {
  auth: {
    authority: 'https://alexanderneumann.b2clogin.com/alexanderneumann.onmicrosoft.com/B2C_1_signin1/',
    validateAuthority: false,
    clientId:  configProvider.API_CLIENT_ID,
    redirectUri: configProvider.AUTH_REDIRECT_URL
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  },
  system: {
    logger: new Logger(
      (logLevel, message, containsPii) => {
        console.log("[MSAL]", message);
      },
      {
        level: LogLevel.Verbose,
        piiLoggingEnabled: false
      }
    )
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
      'openid',
      'https://alexanderneumann.onmicrosoft.com/api/user_impersonation'
  ]
}
 
// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)