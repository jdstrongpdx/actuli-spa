import React, { createContext, useContext, useEffect, useState } from "react";
import { protectedResources } from "../authConfig";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import AppUser from "../interfaces/AppUser";
import {useMsal} from "@azure/msal-react";
import {replaceNullWithEmptyString} from "../utilities/normalizationUtilities";

// Define the type for user data
interface UserContextProps {
    userData: AppUser | null;
    error: Error | null;
    userLoading: boolean;
    refetchUserData: () => void;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextProps>({
    userData: null,
    error: null,
    userLoading: true,
    refetchUserData: () => {},
});

// Create the UserProvider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.user.scopes.read,
    });
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const [userData, setUserData] = useState<AppUser | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        setUserLoading(true);

        try {
            const response = await execute("GET", protectedResources.user.endpoint);
            if (!response) {
                console.error("No data received from API");
                return;
            }

            // Process data with utility function
            const processedData = replaceNullWithEmptyString(response);

            // Extract idTokenClaims
            const idTokenClaims = activeAccount?.idTokenClaims || {};

            // Update user data
            setUserData((prevProfile) => {
                if (!prevProfile) {
                    return {
                        ...processedData,
                        username: idTokenClaims.preferred_username || "",
                        name: idTokenClaims.name || "",
                    } as AppUser;
                }

                return {
                    ...prevProfile,
                    ...processedData,
                    username: idTokenClaims.preferred_username || prevProfile.username || "",
                    name: idTokenClaims.name || prevProfile.name || "",
                };
            });
        } catch (err) {
            console.error("Error fetching user data:", err);
            // Show UI error notifications
            // Example: showErrorNotification("Failed to fetch user data. Please try again later.");
        } finally {
            setUserLoading(false);
        }
    };

    // Fetch user data on mount
    useEffect(() => {
        fetchUserData();
    }, [execute]);

    // Expose user state and actions to children
    return (
        <UserContext.Provider
            value={{
                userData,
                error,
                userLoading,
                refetchUserData: fetchUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to consume user context
export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};