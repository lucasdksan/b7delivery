import styles from "./styles.module.css";
import BackIcon from "./backArrow.svg";
import Link from "next/link";

type HeaderProps = {
    title?: string;
    subTitle?: string;
    backHref: string;
    color: string;
}

const Header = ({ subTitle, title, backHref, color }:HeaderProps)=>{
    return(
        <header className={styles.container}>
            <div className={styles.leftSide}>
                <Link href={backHref}>
                    <BackIcon color={color}/>
                </Link>
            </div>
            <div className={styles.centerSide}>
                {title && <div className={styles.title}>{title}</div> }
                {subTitle && <div className={styles.subTitle}>{subTitle}</div> }
            </div>
            <div className={styles.rightSide}>
                
            </div>
        </header>
    );
}

export default Header;