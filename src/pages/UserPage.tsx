import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from "../authConfig";
import UserView from "../components/users/UserView";
import {UserProvider, useUser} from "../contexts/UserContext";

const UserContent = () => {
    const { userData, error, userLoading } = useUser();

    if (userLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <>{userData ? <UserView userData={userData} /> : null}</>;
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a request object to be passed to the login API, a component to display while
 * authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const UserPage = () => {
    const authRequest = { ...loginRequest };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <UserProvider>
                <UserContent />
            </UserProvider>
        </MsalAuthenticationTemplate>
    );
};

export default UserPage;

