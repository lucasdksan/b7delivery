import styles from "./styles.module.css";

import MenuIcon from "./menuIcon.svg";
import BagIcon from "./bagIcon.svg";
import WishIcon from "./wishIcon.svg";
import SettingIcon from "./settingIcon.svg";
import MyListIcon from "./myListIcon.svg";

type Props = {
    color: string;
    label: string;
    icon: string;
    onClick: ()=>void;
}

const SideBarMenuItem = ({ color, icon, label, onClick }: Props)=>{
    return(
        <li 
            className={styles.container}
            onClick={onClick}
        >
            {icon === "menu" && <MenuIcon color={color}/>}
            {icon === "cart" && <BagIcon color={color}/>}
            {icon === "fav" && <WishIcon color={color}/>}
            {icon === "config" && <SettingIcon color={color}/>}
            {icon === "list" && <MyListIcon color={color}/>}
            <span className={styles.label}>{label}</span>
        </li>
    );
}

export default SideBarMenuItem;