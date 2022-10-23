import styles from "./styles.module.css";

type ButtonProps = {
    color: string;
    label: string;
    onClick: ()=>void;
    fill?: boolean;
}

const Button = ({ color, label, onClick, fill }: ButtonProps)=>{
    return(
        <button 
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