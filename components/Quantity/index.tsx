import { libFormatter } from "../../libs/useFormatter";

import styles from "./styles.module.css";

import TrashIcon from "./TrashIcon.svg";

type Props = {
    color: string;
    count: number;
    min: number;
    max: number;
    small?: boolean;
    add: ()=> void;
    sub: ()=> void;
    remove?: ()=> void;
}

const Quantity = ({ color, count, min, max, small, add, sub, remove }: Props)=>{
    const formatter = libFormatter();

    return(
        <>
            <div className={styles.container}>
                <button 
                    className={styles.buttonQt}
                    style={{
                            backgroundColor: count == min ? "#F2F4F5" : color,
                            width: small ? 35 : 50,
                            height: small ? 35 : 50,
                        }}
                    onClick={sub}
                    disabled={count == min ? true : false}
                >-</button>
                <span 
                    className={styles.contentQt}
                    style={{
                        color: color,
                        fontSize: small ? 14 : 18,
                    }}
                >{formatter.formatQuantity(count, 2)}</span>
                <button 
                    className={styles.buttonQt}
                    style={{
                            backgroundColor: count == max ? "#F2F4F5" : color,
                            width: small ? 35 : 50,
                            height: small ? 35 : 50,
                        }}
                    onClick={add}
                    disabled={count == max ? true : false}
                >+</button>
            </div>
            {
                small &&
                <button 
                    className={styles.trashIcon} 
                    style={{backgroundColor: color}}
                    onClick={remove}
                >
                    <TrashIcon color="#FFF" />
                </button>
            }
        </>
    );
}

export default Quantity;