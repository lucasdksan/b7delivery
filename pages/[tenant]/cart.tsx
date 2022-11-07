import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import styles from "../../styles/Cart.module.css";

import HeadComponent from "../../components/HeadComponent";

import { libApi } from "../../libs/useApi";

import { Product } from "../../types/Product";
import { TenantProps } from "../../types/Tenant";
import { User } from "../../types/User";

import { useAuthContext } from "../../contexts/auth";
import { useAppContext } from "../../contexts/app";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { libFormatter } from "../../libs/useFormatter";

const Cart = ( data:Props )=>{
    const { setToken, setUser } = useAuthContext();
    const { setTanent, tenant } = useAppContext();
    const [ shippingInput, setShippingInput ] = useState("");
    const [ shippingPrice, setShippingPrice ] = useState(0);
    const [ shippingSubTotal, setShippingSubTotal ] = useState(0);
    const [ shippingTotal, setShippingTotal ] = useState(0);
    const formatter = libFormatter();

    const handleShippingCalc = (e:FormEvent)=>{
        e.preventDefault();
    }

    const handleFinish = ()=>{

    }

    useEffect(()=>{
        setTanent(data.tenant);
        setToken(data.token);
        if(data.user) setUser(data.user);
    },[]);

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`Minicart | ${data.tenant.name}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
                title="Minicart"
            />
            <main className={styles.body}>
                <div className={styles.productsQuantity}>
                    <span className={styles.pdQtItens}>X itens</span>
                </div>
                <div className={styles.productsList}>

                </div>
                <div className={styles.shippingArea}>
                    <h3 className={styles.shippingTitle}>Calcular frete e prazo</h3>
                    <form
                        className={styles.shippingForm}
                        onSubmit={handleShippingCalc}
                    >
                        <fieldset>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite seu frete"
                                value={shippingInput}
                                onChange={e => setShippingInput(e)}
                            />
                            <Button 
                                color={data.tenant.mainColor}
                                label="OK"
                                type="submit"
                            />
                        </fieldset>
                    </form>
                    <div className={styles.shippingInfo}>
                        <span className={styles.shippingAddress}>Rua Capitão Martinho Machado</span>
                        <div className={styles.shippingTime}>
                            <span className={styles.shippingTimeText}>Receba em até 20 minutos</span>
                            <span
                                className={styles.shippingTimePrice}
                                style={{ color: data.tenant.mainColor }}
                            >{formatter.formatPrice(shippingPrice)}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.resumeArea}>
                    <fieldset className={styles.resumeItem}>
                        <em className={styles.resumeLeft}>SubTotal</em>
                        <span className={styles.resumeRight}>{formatter.formatPrice(shippingSubTotal)}</span>
                    </fieldset>
                    <fieldset className={styles.resumeItem}>
                        <em className={styles.resumeLeft}>Frete</em>
                        <span className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : "--"}</span>
                    </fieldset>
                    <span className={styles.resumeLine}></span>
                    <fieldset className={styles.resumeItem}>
                        <em className={styles.resumeLeft}>Total</em>
                        <span 
                            className={styles.resumeRightT}
                            style={{
                                color: data.tenant.mainColor
                            }}
                        >{formatter.formatPrice(shippingTotal + shippingSubTotal)}</span>
                    </fieldset>
                    <div className={styles.resumeButton}>
                        <Button 
                            color={data.tenant.mainColor}
                            label="Continuar"
                            onClick={handleFinish}
                            fill
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Cart;

type Props = {
    tenant: TenantProps;
    products: Product[];
    user: User | null;
    token: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = libApi(tenantSlug as string);
    const token = getCookie("token", context);
    const user = await api.authorizeToken(token as string);

    const tenant = await api.getTenant();
    const products = await api.getAllProducts();

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
            products,
            user,
            token: token as string
        }
    }
}