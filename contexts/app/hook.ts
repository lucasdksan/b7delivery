import { AppContext } from "./index";
import { useContext } from "react";
import { TenantProps } from "../../types/Tenant";
import { Actions } from "./types";

export const useAppContext = ()=>{
    const { state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setTanent: (tenant: TenantProps)=>{
            dispatch({
                type: Actions.SET_TENANT,
                payload: { tenant }
            });
        }
    }
}