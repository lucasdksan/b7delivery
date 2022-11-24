import Icon from "../Icon";
import styles from "./styles.module.css";

type Props = {
    color: string;
    leftIcon?: string;
    rightIcon?: string;
    fill?: boolean;
    value: string;
    onClick: ()=>void;
}

const ButtonWithIcon = ({ color, onClick, value, fill, leftIcon, rightIcon }: Props)=>{
    return(
        <button 
            className={styles.contanier}
            style={{
                backgroundColor: fill ? color : "#f9f9fb"
            }}
            onClick={onClick}
        >
            {
                leftIcon && 
                <div 
                    className={styles.leftSide}
                    style={{
                        backgroundColor: fill ? "rgba(0,0,0,.1)" : "#fff"
                    }}
                >
                    <Icon 
                        color={fill ? "#FFF" : color}
                        height={24}
                        width={24}
                        icon={leftIcon as string}
                    />
                </div>
            }
            <span 
                className={styles.centerSide}
                style={{
                    color: fill ? "#fff" : "#1b1b1b"
                }}
            >{value}</span>
            {
                rightIcon && 
                <div 
                    className={styles.rightSide}
                    style={{
                        backgroundColor: fill ? "rgba(0,0,0,.1)" : "#fff"
                    }}
                >
                    <Icon 
                        color={fill ? "#FFF" : color}
                        height={24}
                        width={24}
                        icon={rightIcon as string}
                    />
                </div>
            }

        </button>
    );
}

export default ButtonWithIcon;