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
}

const Quantity = ({ color, count, min, max, small, add, sub }: Props)=>{
    const formatter = libFormatter();

    return(
        <>
            {
                small &&
                <button className={styles.trashIcon} style={{backgroundColor: color}}>
                    <TrashIcon color="#FFF"/>
                </button>
            }
            <div className={styles.container}>
                <button 
                    className={styles.buttonQt}
                    style={{
                            backgroundColor: count == min ? "#F2F4F5" : color,
                            width: small ? 40 : 50,
                            height: small ? 40 : 50,
                        }}
                    onClick={sub}
                    disabled={count == min ? true : false}
                >-</button>
                <span 
                    className={styles.contentQt}
                    style={{
                        color: color,
                        fontSize: small ? 16 : 18,
                    }}
                >{formatter.formatQuantity(count, 2)}</span>
                <button 
                    className={styles.buttonQt}
                    style={{
                            backgroundColor: count == max ? "#F2F4F5" : color,
                            width: small ? 40 : 50,
                            height: small ? 40 : 50,
                        }}
                    onClick={add}
                    disabled={count == max ? true : false}
                >+</button>
            </div>
        </>
    );
}

export default Quantity;