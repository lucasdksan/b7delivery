import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
    label: string;
    onClick?: ()=>void;
    fill?: boolean;
}

const Button = ({ color, label, onClick, fill, ...rest }: ButtonProps)=>{
    return(
        <button
            {...rest}
            className={styles.container}
            onClick={onClick}
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