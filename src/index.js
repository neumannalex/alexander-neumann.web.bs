import './config';
import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AzureAD } from 'react-aad-msal';

import { authProvider } from './authProvider';


ReactDOM.render(
    // <AzureAD provider={authProvider} forceLogin={false}>
        <App />,
    //</AzureAD>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
