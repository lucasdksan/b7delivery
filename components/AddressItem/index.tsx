import { Address } from "../../types/Address";
import styles from "./styles.module.css";
import Icon from "../Icon";

type AddressItemProps = {
    color: string;
    address: Address;
    onSelect: (address: Address)=> void;
    onEdit: (id: number)=> void;
    onDelete: (id: number)=> void;
}

const AddressItem = ({ address, color, onDelete, onEdit, onSelect }:AddressItemProps)=>{
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
                <div className={styles.menuIcon}>
                    <Icon 
                        color="#6A7D8B"
                        icon="btn"
                        width={24}
                        height={24}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddressItem;
