import { createContext, useReducer } from "react";

import { reducer } from "./reducer";

import { ContextType, DataType, ProviderType } from "./types";

const initialState: DataType = {
    tenant: null,
    shippingAddress: null,
    shippingPrice: 0
}

export const AppContext = createContext<ContextType>({
    dispatch: () => { },
    state: initialState
});

export const Provider = ({ children }: ProviderType) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const value = { state, dispatch }

    return (
        <AppContext.Provider
            value={value}
        >
            {children}
        </AppContext.Provider>
    );
}

export { useAppContext } from "./hook";