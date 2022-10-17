import { createContext, ReactNode, useContext, useState } from "react";
import { TenantProps } from "../types/Tenant";

type appContextType = {
    tenant: TenantProps | null;
    setTenant: (newTenant:TenantProps) => void;
}

type Props = {
    children: ReactNode;
}

const defaultValue: appContextType = {
    tenant: null,
    setTenant: () => null
}

const appContext = createContext<appContextType>(defaultValue);

export const useAppContext = () => useContext(appContext);
export const AppContextProvider = ( { children }: Props )=>{
    const [ tenant, setTenant ] = useState<TenantProps | null>(null);

    return(
        <appContext.Provider value={{ tenant, setTenant }}>
            {children}
        </appContext.Provider>
    );
}

// minuto 06:20