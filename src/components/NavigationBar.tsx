import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Nav, Navbar, Dropdown, Container, DropdownButton } from 'react-bootstrap';
import { loginRequest } from '../authConfig';
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import {useUserSettings} from "../contexts/UserSettingsContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const NavigationBar = () => {
    const { instance } = useMsal();
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname);
    const { theme, toggleTheme } = useUserSettings();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest)
            .catch((error) => console.log(error));
    };

    const handleLoginPopup = () => {
        /**
         * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page 
         * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
         * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations 
         */

        instance.loginPopup({
            ...loginRequest,
            redirectUri: '/redirect'
        }).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect({
            account: instance.getActiveAccount(),
        });
    };

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
            account: instance.getActiveAccount(),
        });
    };

    useEffect(() => {
        const pathname = location.pathname;
        const pathParts = pathname.split('/');
        setActiveKey(pathParts[1]);
    }, [location]);

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <>
            <Navbar collapseOnSelect expand="sm">
                <Container>
                    {/* Navbar.Toggle for small screens */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Navbar Brand inside collapser */}
                    <Navbar.Brand href="/" className="navbar-brand me-3">
                        <img
                            alt="Logo"
                            src="/apple-touch-icon.png"
                            width="45"
                            height="45"
                            className="d-inline-block rounded-2 align-middle"
                        />{' '}
                        Actuli
                    </Navbar.Brand>

                    {/* Navbar Collapser */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant="underline" activeKey={activeKey} className="me-auto navbar">
                            <Nav.Item>
                                <Nav.Link href="/" eventKey="">Home</Nav.Link>
                            </Nav.Item>
                            <AuthenticatedTemplate>
                                <Nav.Item>
                                    <Nav.Link href="/user/view" eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/goals" eventKey="goals">Goals</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/achievements" eventKey="achievements">Achievements</Nav.Link>
                                </Nav.Item>
                            </ AuthenticatedTemplate>
                        </Nav>

                        {/* Right-aligned content */}
                        <Nav className="ms-auto">
                            <Nav.Item>
                                <button onClick={toggleTheme} style={{ padding: '10px', fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    {theme === 'light' ? <MdDarkMode /> :   <MdLightMode style={{ filter: 'invert(1)' }} />
                                    }
                                </button>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/auth" eventKey="auth">Auth Details</Nav.Link>
                            </Nav.Item>

                            <AuthenticatedTemplate>
                                    <DropdownButton
                                        variant="warning"
                                        drop="start"
                                        title={activeAccount ? activeAccount.name : 'Unknown'}
                                    >
                                        <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                                            Sign out using Popup
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                            Sign out using Redirect
                                        </Dropdown.Item>
                                    </DropdownButton>
                            </AuthenticatedTemplate>
                            <UnauthenticatedTemplate>
                                    <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
                                        <Dropdown.Item as="button" onClick={handleLoginPopup}>
                                            Sign in using Popup
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                                            Sign in using Redirect
                                        </Dropdown.Item>
                                    </DropdownButton>
                            </UnauthenticatedTemplate>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
