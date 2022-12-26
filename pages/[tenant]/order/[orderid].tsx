import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

import styles from "../../../styles/OrderID.module.css";

import HeadComponent from "../../../components/HeadComponent";
import Header from "../../../components/Header";
import Input from "../../../components/Input";

import { libApi } from "../../../libs/useApi";
import { libFormatter } from "../../../libs/useFormatter";

import { TenantProps } from "../../../types/Tenant";
import { User } from "../../../types/User";

import { useAuthContext } from "../../../contexts/auth";
import { useAppContext } from "../../../contexts/app";
import AreaCheckout from "../../../components/AreaCheckout";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import { Order } from "../../../types/Order";
import CartProductItem from "../../../components/CartProductItem";

const OrderID = ( data:Props )=>{
    const { setToken, setUser } = useAuthContext();
    const { setTanent, tenant } = useAppContext();

    const formatter = libFormatter();
    const router = useRouter();
    const api = libApi(data.tenant.slug);
    const orderStatusList = {
        preparing: {
            label: "Preparando",
            longLabel: "Preparando o seu pedido...",
            backgroundColor: "#FEFAE6",
            fontColor: "#D4BC34",
            pct: 25
        },

        sent: {
            label: "Enviado",
            longLabel: "Enviamos o seu pedido!",
            backgroundColor: "#F1F3F8",
            fontColor: "#758CBD",
            pct: 75
        },

        delivered: {
            label: "Entregue",
            longLabel: "Seu pedido foi entregue",
            backgroundColor: "#F1F8F6",
            fontColor: "",
            pct: 100
        }
    }

    const handleChangeAddress = ()=>{
        router.push(`/${data.tenant.slug}/myaddress`);
    }

    useEffect(()=>{
        setTanent(data.tenant);
        setToken(data.token);
        if(data.user) setUser(data.user);
    },[]);

    useEffect(()=>{
        if(data.order.status !== "delivered"){
            setTimeout(()=>{
                router.reload();
            }, 60000);
        }
    },[]);

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`Pedido #${data.order.id}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}/cart`}
                color={data.tenant.mainColor}
                title={`Pedido #${data.order.id}`}
            />

            <section className={styles.infoGroup}>
                <AreaCheckout
                    label="Endereço"
                    children={
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            onClick={handleChangeAddress}
                            value={data.order.shippingAddress ? `${data.order.shippingAddress.street} ${data.order.shippingAddress.number} - ${data.order.shippingAddress.city}`: "Escolha um endereço"}
                            leftIcon="ping"
                            rightIcon="arrow"
                        />
                    }
                />

                <AreaCheckout
                    label="Tipo de Pagamento"
                    children={
                        <div className={styles.containerButtons}>
                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                onClick={()=>{}}
                                value="Dinheiro"
                                leftIcon="money"
                                fill={data.order.paymentType === "money"}
                            />

                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                onClick={()=> {}}
                                value="Cartão"
                                leftIcon="card"
                                fill={data.order.paymentType === "card"}
                            />
                        </div>
                    }
                />

                {
                    data.order.paymentType === "money" &&
                    <AreaCheckout
                        label="Troco"
                        children={
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Quanto você tem em dinheiro?"
                                value={data.order.paymentChange?.toString() ?? ""}
                                onChange={()=>{}}
                            />
                        }
                    />
                }

                <AreaCheckout
                    label="Cupom de desconto"
                    children={
                        data.order.coupon && 
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            onClick={()=> console.log("oi")}
                            value={data.order.coupon.toUpperCase()}
                            leftIcon="coupun"
                            rightIcon="check"
                        />
                    }
                />
            </section>

            <main className={styles.body}>
                {
                    data.order.status !== "delivered" &&
                    <div 
                        className={styles.statusArea}
                        style={{
                            backgroundColor: orderStatusList[data.order.status].backgroundColor,

                        }}
                    >
                        <span 
                            className={styles.statusLongLabel}
                            style={{
                                color: orderStatusList[data.order.status].fontColor
                            }}
                        >
                            {orderStatusList[data.order.status].longLabel}
                        </span>
                        <div className={styles.statusPct}>
                            <div 
                                className={styles.statusPctBar}
                                style={{
                                    width: `${orderStatusList[data.order.status].pct}%`,
                                    backgroundColor: orderStatusList[data.order.status].fontColor
                                }}
                            ></div>
                        </div>
                        <em className={styles.statusMsg}>Aguardando mudança de status...</em>
                    </div>
                }

                <div className={styles.orderInfoArea}>
                    <span 
                        className={styles.orderInfoStatus}
                        style={{
                            backgroundColor: orderStatusList[data.order.status].backgroundColor,
                            color: orderStatusList[data.order.status].fontColor
                        }}
                    >
                        { orderStatusList[data.order.status].label }
                    </span>
                    <div className={styles.productsQuantity}>
                        <span className={styles.pdQtItens}>{data.order.products.length} {data.order.products.length === 1 ? "Item" : "Itens"}</span>
                    </div>
                    <em className={styles.orderInfoDate}>{formatter.formatDate(data.order.orderDate)}</em>
                </div>
                
                <div className={styles.productsList}>
                    {
                        data.order.products.map((cartItem, index)=>{
                            return(
                                <CartProductItem 
                                    key={index}
                                    color={data.tenant.mainColor}
                                    quantity={cartItem.qt}
                                    product={cartItem.product}
                                    onChange={()=>{}}
                                    removeFunction={()=>{}}
                                    noEdit
                                />
                            );
                        })
                    }
                </div>
                <div className={styles.resumeArea}>
                    <fieldset className={styles.resumeItem}>
                        <em className={styles.resumeLeft}>SubTotal</em>
                        <span className={styles.resumeRight}>{formatter.formatPrice(data.order.subtotal)}</span>
                    </fieldset>
                    {
                        data.order.couponDiscount &&
                        <fieldset className={styles.resumeItem}>
                            <em className={styles.resumeLeft}>Desconto</em>
                            <span className={styles.resumeRight}> -{formatter.formatPrice(data.order.couponDiscount)}</span>
                        </fieldset>
                    }
                    <fieldset className={styles.resumeItem}>
                        <em className={styles.resumeLeft}>Frete</em>
                        <span className={styles.resumeRight}>{data.order.shippingPrice > 0 ? formatter.formatPrice(data.order.shippingPrice) : "--"}</span>
                    </fieldset>
                    <span className={styles.resumeLine}></span>
                    <fieldset className={styles.resumeItem}>
                        <em className={styles.resumeLeft}>Total</em>
                        <span 
                            className={styles.resumeRightT}
                            style={{
                                color: data.tenant.mainColor
                            }}
                        >{formatter.formatPrice(data.order.total)}</span>
                    </fieldset>
                </div>
            </main>
        </div>
    );
}

export default OrderID;

type Props = {
    tenant: TenantProps;
    user: User | null;
    token: string;
    order: Order;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, orderid } = context.query;
    const api = libApi(tenantSlug as string);
    
    const token = getCookie("token", context);

    const user = await api.authorizeToken(token as string);
    const tenant = await api.getTenant();

    const order = await api.getOrder(parseInt(orderid as string));


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
            user,
            token: token as string,
            order
        }
    }
}