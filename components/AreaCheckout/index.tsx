import { ReactNode } from "react";
import style from "./styles.module.css";

type Props = {
    label: string;
    children: ReactNode;
}

const AreaCheckout = ({ label, children }: Props)=>{
    return(
        <div className={style.infoArea}>
            <label className={style.infoTitle}>{label}</label>
            <div className={style.infoBody}>
                {
                    children
                }
            </div>
        </div>
    );
}

export default AreaCheckout;