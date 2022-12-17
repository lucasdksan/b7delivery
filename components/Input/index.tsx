import { useState } from "react";

import styles from "./styles.module.css";

import EyeOn from "./eyeIcon.svg";
import EyeOff from "./closeEyeIcon.svg";

type InputProps = {
    color: string;
    placeholder: string;
    value: string;
    onChange: (newValue: string) => void;
    password?: boolean;  
    warning?: boolean;
}

const Input = ({ color, onChange, placeholder, value, password, warning }:InputProps)=>{
    const [ showPassword, setShowPassword ] = useState(false);
    const [ focused, setFocused ] = useState(false);

    return(
        <div 
            className={styles.container}
            style={
                {
                    borderColor: !warning ? (focused ? color : "#F9F9FB") : "#ff0000",
                    backgroundColor: focused ? "#FFF": "#F9F9FB"
                }
            }
        >
            <input  
                type={ password ? (showPassword ? "text" : "password") : "text" }
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {
                password && 
                <div 
                    className={styles.showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    { showPassword && <EyeOn color={color}/> }
                    { !showPassword && <EyeOff color={color}/> }
                </div>
            }
        </div>
    );
}

export default Input;