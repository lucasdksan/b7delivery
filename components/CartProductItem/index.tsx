import { useEffect, useState } from "react";
import { libFormatter } from "../../libs/useFormatter";
import { Product } from "../../types/Product";
import Quantity from "../Quantity";
import styles from "./styles.module.css";

type CartProductItemProps = {
    color: string;
    quantity: number;
    product: Product;
    onChange: (newCount: number, id: number)=>void;
    removeFunction: (id: number)=> void;
}

const CartProductItem = ({ color, onChange, product, quantity, removeFunction }: CartProductItemProps)=>{
    const formatter = libFormatter();
    const [qtProduct, setQtProduct] = useState(quantity);

    function addQtProduct() {
        if (qtProduct >= product.min && qtProduct < product.max) {
            setQtProduct(qtProduct + 1);
        }
    }

    function subQtProduct() {
        if (qtProduct > product.min && qtProduct <= product.max) {
            setQtProduct(qtProduct - 1);
        }
    }

    function rmvFunction(){
        removeFunction(product.id)
    }

    useEffect(()=>{
        onChange(qtProduct, product.id);
    },[qtProduct]);

    return( 
        <div className={styles.container}>
            <div className={styles.productImage}>
                <img src={product.image} alt="Image product minicart" />
            </div>
            <div className={styles.productInfo}>
                <span className={styles.productCategory}>{product.categoryName}</span>
                <span className={styles.productName}>{product.name}</span>
                <span 
                    className={styles.productPrice}
                    style={{
                        color: color
                    }}
                >{ formatter.formatPrice(product.price)}</span>
            </div>
            <div className={styles.qtControl}>
                <Quantity
                    add={addQtProduct}
                    color={color}
                    count={qtProduct}
                    max={product.max}
                    min={product.min}
                    sub={subQtProduct}
                    small
                    remove={rmvFunction}
                />
            </div>
        </div>
    );
}

export default CartProductItem;