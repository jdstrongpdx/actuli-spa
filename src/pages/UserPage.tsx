import { useEffect, useState } from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { loginRequest, protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import UserView from "../components/users/UserView";

const UserContent = () => {
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.usersAPI.scopes.read,
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!userData) {
            execute("GET", protectedResources.usersAPI.endpoint).then((response) => {
                setUserData(response);
            });
        }
    }, [execute, userData])

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
    const authRequest = {
        ...loginRequest,
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <UserContent />
        </MsalAuthenticationTemplate>
    );
};

export default UserPage;
