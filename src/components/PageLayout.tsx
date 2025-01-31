import { NavigationBar } from "./NavigationBar";
import Footer from "./Footer";
import {useUserSettings} from "../contexts/UserSettingsContext";

export const PageLayout = (props) => {
    const { theme } = useUserSettings();
    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <div className={theme}>

                    {/* Header */}
                    <header className="p-3">
                        <NavigationBar />
                    </header>

                    {/* Main Content */}
                    <main className="flex-grow-1">
                        <div className="container py-4">
                            {props.children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="py-3 mt-auto">

                        <Footer />
                    </footer>
                </div>
            </div>
        </>
    );
};
