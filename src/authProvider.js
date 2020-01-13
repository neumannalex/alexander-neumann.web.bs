import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import { Logger, LogLevel } from 'msal';
 
// https://www.npmjs.com/package/react-aad-msal
// Msal Configurations
const config = {
  auth: {
    authority: 'https://alexanderneumann.b2clogin.com/alexanderneumann.onmicrosoft.com/B2C_1_signin1/',
    validateAuthority: false,
    clientId: 'b7a437ff-d1ab-42c4-8b73-e366a31d890f',
    redirectUri: 'http://localhost:3000/auth.html'
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