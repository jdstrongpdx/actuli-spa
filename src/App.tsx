import { Routes, Route } from 'react-router-dom';
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import { PageLayout } from './components/PageLayout';
import { AuthDetails } from './pages/AuthDetails';
import {GoalsList } from './pages/GoalsList';

import './styles/App.css';
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import ProfileEditForm from "./components/users/ProfileEditForm";
import {TypesProvider} from "./contexts/TypesContext";
import {UserProvider} from "./contexts/UserContext";


/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a request object to be passed to the login API, a component to display while
 * authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */

const App: React.FC<{ instance: PublicClientApplication }> = ({ instance }) => {
    const authRequest = { ...loginRequest };

    return (
        <MsalProvider instance={instance}>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={authRequest}
            >
                <TypesProvider>
                    <UserProvider>
                        <PageLayout>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/user" element={<UserProfile />} />
                                <Route path="/user/profile/edit" element={<ProfileEditForm />} />
                                <Route path="/goals" element={<GoalsList />} />
                                <Route path="/auth" element={<AuthDetails />} />
                                {/* Fallback Route */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </PageLayout>
                    </UserProvider>
                </TypesProvider>
            </MsalAuthenticationTemplate>
        </MsalProvider>
    );
};


export default App;