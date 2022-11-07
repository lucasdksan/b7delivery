import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
    label: string;
    fill?: boolean;
}

const Button = ({ color, label, fill, ...rest }: ButtonProps)=>{
    return(
        <button
            {...rest}
            className={styles.container}
            style={{
                color: fill ? "#fff" : color,
                borderColor: color,
                backgroundColor: fill ? color : "transparent",
            }}
        >
            { label }
        </button>
    );
}

export default Button;