import styles from "./styles.module.css";

type Props = {
    color: string;
    count: number;
    min: number;
    max: number;
    add: ()=> void;
    sub: ()=> void;
}

const Quantity = ({ color, count, min, max, add, sub }: Props)=>{
    return(
        <div className={styles.container}>
            <button 
                className={styles.buttonQt}
                style={{backgroundColor: count == min ? "#F2F4F5" : color}}
                onClick={sub}
                disabled={count == min ? true : false}
            >-</button>
            <span 
                className={styles.contentQt}
                style={{color: color}}
            >{count}</span>
            <button 
                className={styles.buttonQt}
                style={{backgroundColor: count == max ? "#F2F4F5" : color}}
                onClick={add}
                disabled={count == max ? true : false}
            >+</button>
        </div>
    );
}

export default Quantity;