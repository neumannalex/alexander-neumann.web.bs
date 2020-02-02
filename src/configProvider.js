import config from 'react-global-configuration';

class ConfigProvider  {
    get API_DOMAIN() { return config.get('apiDomain') };
    get API_CLIENT_ID() { return config.get('apiClientId') };
    get AUTH_REDIRECT_URL() { return config.get('authRedirectUrl') };
}

export const configProvider = new ConfigProvider();