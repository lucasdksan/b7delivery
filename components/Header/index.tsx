import Link from "next/link";

import styles from "./styles.module.css";

import BackIcon from "./backArrow.svg";

type HeaderProps = {
    title?: string;
    subTitle?: string;
    backHref: string;
    color: string;
    invert?: boolean;
}

const Header = ({ subTitle, title, backHref, color, invert }:HeaderProps)=>{
    return(
        <header className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={backHref}>
                    <a className={ invert ? styles.buttonTransparent : "" }>
                        <BackIcon color={ invert ? "#FFF" : color}/>
                    </a>
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title && 
                    <div className={styles.title} style={{ color: invert ? "#FFF" : "#1B1B1B" }}>{title}</div> 
                }
                {subTitle && <div className={styles.subTitle}>{subTitle}</div> }
            </div>
            <div className={styles.rightSide}>
                
            </div>
        </header>
    );
}

export default Header;