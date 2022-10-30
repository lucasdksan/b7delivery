import Link from "next/link";
import { useAppContext } from "../../contexts/AppContext";
import { libFormatter } from "../../libs/useFormatter";
import { Product } from "../../types/Product";
import styles from "./styles.module.css";

interface ProductProps {
    data: Product;
}

const ProductItem = ({ data }: ProductProps)=>{
    const { tenant } = useAppContext();
    const formatter = libFormatter();
    const value = `${data.price.toFixed(2)}`;
    

    return(
        <Link href={`${tenant?.slug}/product/${data.id}`}>
            <a className={styles.container}>
                <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img src={data.image} alt="Image Burgers" />
                    </div>  
                    <div className={styles.infoContent}>
                        <span className={styles.catName}>{data.categoryName}</span>
                        <strong className={styles.name}>{data.name}</strong>
                        <span className={styles.price} style={{color: tenant?.mainColor}}>{formatter.formatPrice(data.price)}</span>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default ProductItem;