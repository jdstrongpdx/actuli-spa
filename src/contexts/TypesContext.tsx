import React, { createContext, useContext, useEffect, useState } from "react";
import { protectedResources } from "../authConfig";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import {TypeData} from "../interfaces/TypeData";
import { ApiRoutes } from "../config/apiRoutes";

interface TypeContextProps {
    typesData: TypeData | null;
    error: Error | null;
    typesLoading: boolean;
    refetchTypesData: () => void;
}

const TypesContext = createContext<TypeContextProps | null>(null);

export const TypesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.backend.scopes.read,
    });

    const [typesData, setTypesData] = useState<TypeData | null>(null);
    const [typesLoading, setTypesLoading] = useState<boolean>(true);

    const fetchTypesData = async () => {
        setTypesLoading(true);

        try {
            // Properly await the asynchronous execute call
            const response = await execute("GET", protectedResources.backend.endpoint + ApiRoutes.GetTypes);

            console.log("Response:", response); // Confirm what the resolved value is

            // Verify that the response is not undefined or null
            if (!response) {
                console.error("No data received from Types API");
                return;
            }

            // Assume the response is the expected data
            const data: TypeData = response;

            // Set the resolved data to state
            setTypesData(data);
        } catch (err) {
            console.error("Error fetching user data:", err);
        } finally {
            setTypesLoading(false);
        }
    };

    useEffect(() => {
        fetchTypesData();
    }, [execute]);

    return (
        <TypesContext.Provider
            value={{
                typesData,
                error,
                typesLoading,
                refetchTypesData: fetchTypesData,
            }}
        >
            {children}
        </TypesContext.Provider>

    );
};


export const useTypes = () => {
    const context = useContext(TypesContext);

    if (!context) {
        throw new Error("useTypes must be used within a TypesProvider");
    }
    return context;
};