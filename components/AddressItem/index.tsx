import { Address } from "../../types/Address";
import styles from "./styles.module.css";
import Icon from "../Icon";

type AddressItemProps = {
    color: string;
    menuOpened: number;
    address: Address;
    setMenuOpened: (id: number)=>void;
    onSelect: (address: Address)=> void;
    onEdit: (id: number)=> void;
    onDelete: (id: number)=> void;
}

const AddressItem = ({ address, color, menuOpened, onDelete, onEdit, onSelect, setMenuOpened }:AddressItemProps)=>{
    return(
        <div className={styles.container}>
            <div 
                className={styles.addressArea}
                onClick={()=> onSelect(address)}
            >
                <div className={styles.addressIcon}>
                    <Icon 
                        color={color}
                        icon="dots"
                        height={24}
                        width={24}
                    />
                </div>
                <div className={styles.addressText}>
                    <span className={styles.text}>
                        {`${address.street} ${address.number}, ${address.state}`}
                    </span>
                </div>
            </div>
            <div className={styles.btnArea}>
                <div 
                    className={styles.menuIcon}
                    onClick={()=>setMenuOpened(address.id)}
                >
                    <Icon 
                        color="#6A7D8B"
                        icon="btn"
                        width={24}
                        height={24}
                    />
                </div>
                {
                    menuOpened === address.id &&
                    (<div className={styles.popUp}>
                        <div 
                            className={styles.popUpItem}
                            onClick={()=>onEdit(address.id)}
                        >
                            <div className={styles.popUpIcon}>
                                <Icon 
                                    color={color}
                                    height={24}
                                    width={24}
                                    icon="edit"
                                />
                            </div>
                            <span className={styles.popUpText}>Editar</span>
                        </div>
                        <div 
                            className={styles.popUpItem}
                            onClick={()=>onDelete(address.id)}
                        >
                            <div className={styles.popUpIcon}>
                                <Icon 
                                    color={color}
                                    height={24}
                                    width={24}
                                    icon="delete"
                                />
                            </div>
                            <span className={styles.popUpText}>Deletar</span>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default AddressItem;
