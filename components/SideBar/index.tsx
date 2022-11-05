import { useAuthContext } from "../../contexts/auth";
import { TenantProps } from "../../types/Tenant";

import Button from "../Button";
import SideBarMenuItem from "../SideBarMenuItem";
import styles from "./styles.module.css";
import LogoutIcon from "./LogoutIcon.svg";
import { useRouter } from "next/router";

type Props = {
    tenant: TenantProps;
    open: boolean;
    onClose: ()=>void;
}

const SideBar = ({ tenant, open, onClose }: Props)=>{
    const { user, setToken } = useAuthContext();
    const router = useRouter();

    function handleSignIn(){
        router.push(`/${tenant.slug}/login`);
    }

    return(
        <div 
            className={styles.container}
            style={{
                width: open ? "100vw":"0px"
            }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div 
                        className={styles.loginArea}
                        style={{
                            borderBottomColor: tenant.mainColor
                        }}
                    >
                        {
                            user &&
                            <span className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Último pedido há X semanas
                            </span>
                        }
                        {
                            !user && 
                            <Button 
                                label="Fazer Login"
                                color={tenant.mainColor}
                                onClick={handleSignIn}
                                fill
                            />
                        }
                    </div>
                    <button 
                        className={styles.closeBtn}
                        style={{
                            color: tenant.mainColor
                        }}
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <span className={styles.line}></span>
                <div className={styles.menu}>
                    <nav>
                        <ul>
                            <SideBarMenuItem
                                color={tenant.mainColor}
                                icon="menu"
                                label="Cardápio"
                                onClick={onClose}
                            />
                            <SideBarMenuItem
                                color={tenant.mainColor}
                                icon="cart"
                                label="Sacola"
                                onClick={()=> router.push(`/${tenant.slug}/cart`)}
                            />
                            <SideBarMenuItem
                                color={tenant.mainColor}
                                icon="fav"
                                label="Favoritos"
                                onClick={()=> router.push(`/${tenant.slug}/wishlist`)}
                            />
                            <SideBarMenuItem
                                color={tenant.mainColor}
                                icon="list"
                                label="Meus Pedidos"
                                onClick={()=> router.push(`/${tenant.slug}/orders`)}
                            />
                            <SideBarMenuItem
                                color={tenant.mainColor}
                                icon="config"
                                label="Configurações"
                                onClick={()=> router.push("/settings")}
                            />
                        </ul>
                    </nav>
                    {
                        user &&
                        <button 
                            className={styles.menuBottom}
                            onClick={()=>{
                                setToken("");
                                onClose();
                            }}
                        >
                            <LogoutIcon color={tenant.mainColor}/>
                            <span className={styles.logoutBtn}>Sair</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default SideBar;