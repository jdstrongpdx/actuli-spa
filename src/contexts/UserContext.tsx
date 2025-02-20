import React, { createContext, useContext, useEffect, useState } from "react";
import { protectedResources } from "../authConfig";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import AppUser from "../interfaces/AppUser";
import {useMsal} from "@azure/msal-react";
import {replaceNullWithEmptyString} from "../utilities/normalizationUtilities";
import { ApiRoutes } from "../config/apiRoutes";
import {toast} from "react-toastify";

// Define the type for user data
interface UserContextProps {
    userData: AppUser | null;
    error: Error | null;
    userLoading: boolean;
    refreshUserData: () => void;
    updateUser: (route: string, data: Partial<AppUser>) => Promise<void>;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextProps | null>(null);

// Create the UserProvider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.backend.scopes.read,
    });
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const [userData, setUserData] = useState<AppUser | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        setUserLoading(true);

        try {
            const response = await execute("GET", protectedResources.backend.endpoint + ApiRoutes.GetUser);
            if (!response) {
                toast.error("No data received from API");
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

            toast.success("User data successfully fetched!");
        } catch (err) {
            toast.error("Error fetching user data: " + err);
        } finally {
            setUserLoading(false);
        }
    };

    const updateUser = async (route: string, data: Partial<AppUser>): Promise<void> => {
        setUserLoading(true);
        try {
            const response = await execute("PUT", protectedResources.backend.endpoint + route, data);
            if (!response) {
                console.error("No response from API when updating user data");
                return;
            }

            const updatedData: any = replaceNullWithEmptyString(response);
            setUserData(updatedData);
        } catch (err) {
            console.error("Error updating user data:", err);
        } finally {
            setUserLoading(false);
        }
    };

    // Fetch user data on mount
    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line
    }, [execute]);

    // Expose user state and actions to children
    return (
        <UserContext.Provider
            value={{
                userData,
                error,
                userLoading,
                refreshUserData: fetchUserData,
                updateUser: updateUser,
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