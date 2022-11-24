import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

import styles from "../../styles/Checkout.module.css";

import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { libApi } from "../../libs/useApi";
import { libFormatter } from "../../libs/useFormatter";

import { TenantProps } from "../../types/Tenant";
import { User } from "../../types/User";
import { CartItem } from "../../types/CartItem";

import { useAuthContext } from "../../contexts/auth";
import { useAppContext } from "../../contexts/app";
import CartProductItem from "../../components/CartProductItem";
import { CartCookie } from "../../types/CartCookie";
import AreaCheckout from "../../components/AreaCheckout";
import ButtonWithIcon from "../../components/ButtonWithIcon";

const Checkout = ( data:Props )=>{
    const { setToken, setUser } = useAuthContext();
    const { setTanent, tenant } = useAppContext();

    const [ shippingInput, setShippingInput ] = useState("");
    const [ shippingAddress, setShippingAddress ] = useState("");
    const [ shippingPrice, setShippingPrice ] = useState(0);
    const [ shippingSubTotal, setShippingSubTotal ] = useState(0);
    const [ shippingTotal, setShippingTotal ] = useState(0);
    const [ shippingTime, setShippingTime ] = useState(0);
    const [ cart, setCart ] = useState<CartItem[]>(data.cart);

    const formatter = libFormatter();
    const router = useRouter();

    const handleShippingCalc = (e:FormEvent)=>{
        e.preventDefault();
        setShippingAddress("Rua Capitão Martinho Machado");
        setShippingPrice(9.50);
        setShippingTime(20);
    }

    const handleFinish = ()=>{
        router.push(`/${data.tenant.slug}/checkout`);
    }

    const handleCartChange = (newCount: number, id: number)=>{
        const tmpCart:CartItem[] = [...cart]; 
        const cartIndex = tmpCart.findIndex(item => item.product.id == id);

        if(newCount > 0){
            tmpCart[cartIndex].qt = newCount;
        }
        
        let newCart: CartItem[] = tmpCart.filter(item => item);
        let cartCookie: CartCookie[] = [];
        
        setCart(newCart);

        for(let i in newCart){
            cartCookie.push({
                id: newCart[i].product.id,
                qt: newCart[i].qt
            });
        }
        setCookie("cart", JSON.stringify(cartCookie));
    }

    const removeProductCart = (id: number)=>{
        const tmpCart:CartItem[] = [...cart];

        let newCart: CartItem[];
        let cartCookie: CartCookie[] = [];

        newCart = tmpCart.filter( item => item.product.id !== id);

        setCart(newCart);

        for(let i in newCart){
            cartCookie.push({
                id: newCart[i].product.id,
                qt: newCart[i].qt
            });
        }

        setCookie("cart", JSON.stringify(cartCookie));
    }

    const handleChangeAddress = ()=>{
        console.log("VC TENTOU")
    }

    useEffect(()=>{
        let sub = 0;
        
        for(let i in cart){
            sub += cart[i].product.price * cart[i].qt;
        }

        setShippingSubTotal(sub);
    },[cart]);

    useEffect(()=>{
        setTanent(data.tenant);
        setToken(data.token);
        if(data.user) setUser(data.user);
    },[]);

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`Checkout | ${data.tenant.name}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}/cart`}
                color={data.tenant.mainColor}
                title="Checkout"
            />

            <section className={styles.infoGroup}>
                <AreaCheckout
                    label="Endereço"
                    children={
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            onClick={handleChangeAddress}
                            value="Oiiiiiiiiiiiiiiii"
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
                                onClick={()=> console.log("oi")}
                                value="Dinheiro"
                                leftIcon="money"
                            />

                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                onClick={()=> console.log("oi")}
                                value="Cartão"
                                leftIcon="card"
                            />
                        </div>
                    }
                />

                <AreaCheckout
                    label="Troco"
                    children={
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            onClick={()=> console.log("oi")}
                            value="R$ 50,00"
                        />
                    }
                />

                <AreaCheckout
                    label="Cupom de desconto"
                    children={
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            onClick={()=> console.log("oi")}
                            value="LucasDev10"
                            leftIcon="coupun"
                            rightIcon="check"
                        />
                    }
                />
            </section>

            <main className={styles.body}>
                <div className={styles.productsQuantity}>
                    <span className={styles.pdQtItens}>{cart.length} {cart.length === 1 ? "Item" : "Itens"}</span>
                </div>
                <div className={styles.productsList}>
                    {
                        cart.map((cartItem, index)=>{
                            return(
                                <CartProductItem 
                                    key={index}
                                    color={data.tenant.mainColor}
                                    quantity={cartItem.qt}
                                    product={cartItem.product}
                                    onChange={handleCartChange}
                                    removeFunction={removeProductCart}
                                />
                            );
                        })
                    }
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
                                width
                            />
                        </fieldset>
                    </form>
                    { shippingPrice > 0 &&
                        <div className={styles.shippingInfo}>
                            <span className={styles.shippingAddress}>{shippingAddress}</span>
                            <div className={styles.shippingTime}>
                                <span className={styles.shippingTimeText}>Receba em até {shippingTime} minutos</span>
                                <span
                                    className={styles.shippingTimePrice}
                                    style={{ color: data.tenant.mainColor }}
                                >{formatter.formatPrice(shippingPrice)}</span>
                            </div>
                        </div>
                    }
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

export default Checkout;

type Props = {
    tenant: TenantProps;
    user: User | null;
    token: string;
    cart: CartItem[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = libApi(tenantSlug as string);
    
    const token = getCookie("token", context);
    const cartCookie = getCookie("cart", context);

    const user = await api.authorizeToken(token as string);
    const tenant = await api.getTenant();
    const cart = await api.getCartProducts(cartCookie as string);


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
            cart
        }
    }
}