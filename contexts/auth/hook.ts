import { useContext } from "react";
import { setCookie } from "cookies-next";

import { AppContext } from "./index";

import { Actions } from "./types";
import { User } from "../../types/User";

export const useAuthContext = ()=>{
    const { state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setToken: (token: string)=>{
            setCookie("token", token);
            dispatch({
                type: Actions.SET_TOKEN,
                payload: { token }
            });
        },
        setUser: (user: User | null)=>{
            dispatch({
                type: Actions.SET_USER,
                payload: { user }
            });
        }
    }
}