import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { msalConfig } from './authConfig.js';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import {UserSettingsProvider} from "./contexts/UserSettingsContext";

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
// MSAL imports
import {
    PublicClientApplication,
    EventType,
    EventMessage,
    AuthenticationResult,
} from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;
            msalInstance.setActiveAccount(account);
        }
    });

    const root = ReactDOM.createRoot(
        document.getElementById("root") as HTMLElement
    );
    root.render(
        <UserSettingsProvider>
            <BrowserRouter>
                <App instance={msalInstance} />
            </BrowserRouter>
        </UserSettingsProvider>
    );
});