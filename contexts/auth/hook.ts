import { AppContext } from "./index";
import { useContext } from "react";
import { Actions } from "./types";
import { User } from "../../types/User";

export const useAuthContext = ()=>{
    const { state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setToken: (token: string)=>{
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