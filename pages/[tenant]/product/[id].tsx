import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import styles from "../../../styles/Product-id.module.css";

import Button from "../../../components/Button";
import HeadComponent from "../../../components/HeadComponent";
import Header from "../../../components/Header";
import Quantity from "../../../components/Quantity";

import { useAppContext } from "../../../contexts/app";

import { libApi } from "../../../libs/useApi";
import { libFormatter } from "../../../libs/useFormatter";

import { Product } from "../../../types/Product";
import { TenantProps } from "../../../types/Tenant";

const ProductPage = ( data:Props )=>{
    const { setTanent, tenant } = useAppContext();
    const [ qtProduct, setQtProduct ] = useState(1);
    const formatter = libFormatter();

    useEffect(()=>{
        setTanent(data.tenant);
    },[]);

    function handleAddToCart(){

    }

    function addQtProduct(){
        if(qtProduct >= data.product.min && qtProduct < data.product.max){
            setQtProduct(qtProduct+1);
        }
    }

    function subQtProduct(){
        if(qtProduct > data.product.min && qtProduct <= data.product.max){
            setQtProduct(qtProduct-1);
        }
    }

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`${data.product.name} | ${data.tenant.name}`}
            />
            <div className={styles.headerArea}>
                <Header
                    backHref={`/${data.tenant.slug}`}
                    title="Produto"
                    color={data.tenant.mainColor}
                    invert
                />
            </div>
            <div className={styles.headerBg} style={{backgroundColor: data.tenant.mainColor}}>
                
            </div>
            <div className={styles.productImage}>
                <img 
                    src={data.product.image} 
                    alt="Image product selected" 
                />
            </div>
            <main className={styles.body}>
                <div className={styles.containerNames}>
                    <span className={styles.category}>{data.product.categoryName}</span>
                    <h1 className={styles.title}>{data.product.name}</h1>
                    <span className={styles.line} style={{borderBottomColor: data.tenant.mainColor}}></span>
                    <p className={styles.description}>{data.product.description}</p>
                </div>
                <div className={styles.containerDinamic}>
                    <span className={styles.qtText}>Quantidade</span>
                    <div className={styles.area}>
                        <div className={styles.areaLeft}>
                            <Quantity 
                                color={data.tenant.mainColor}
                                count={qtProduct}
                                add={addQtProduct}
                                sub={subQtProduct}
                                max={data.product.max}
                                min={data.product.min}
                            />
                        </div>
                        <div className={styles.areaRight}>
                            <span className={styles.valueProduct} style={{color: data.tenant.mainColor}}>
                                { formatter.formatPrice(data.product.price * qtProduct) }
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Adicionar"
                        onClick={handleAddToCart}
                        fill
                    />
                </div>
            </main>
        </div>
    );
}

export default ProductPage;

type Props = {
    tenant: TenantProps;
    product: Product;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    const api = libApi(tenantSlug as string);

    const tenant = await api.getTenant();
    const product = await api.getProduct(id as string);

    if(!tenant){
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }   

    return {
        props: {
            tenant,
            product
        }
    }
}