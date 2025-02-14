import { Routes, Route } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";
import { PageLayout } from './components/PageLayout';
import { AuthDetails } from './pages/AuthDetails';
import {GoalsList } from './pages/GoalsList';

import './styles/App.css';
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/UserPage";
import UserEdit from "./components/users/UserEdit";

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/user/view" element={<UserPage />} />
            <Route path="/user/edit" element={<UserEdit />} />
            <Route path="/goals" element={<GoalsList />} />
            <Route path="/auth" element={<AuthDetails />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */

const App: React.FC<{ instance: PublicClientApplication; }> = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <PageLayout>
                <Pages />
            </PageLayout>
        </MsalProvider>
    );
};

export default App;