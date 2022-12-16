import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

import styles from "../../../styles/Newaddress.module.css";

import HeadComponent from "../../../components/HeadComponent";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

import { libApi } from "../../../libs/useApi";
import { libFormatter } from "../../../libs/useFormatter";

import { TenantProps } from "../../../types/Tenant";
import { User } from "../../../types/User";

import { useAuthContext } from "../../../contexts/auth";
import { useAppContext } from "../../../contexts/app";
import { Address } from "../../../types/Address";
import AddressItem from "../../../components/AddressItem";
import { useEffect, useState } from "react";

const Newaddress = ( data:Props )=>{
    const [menuOpened, setMenuOpened] = useState(0);
    const { setToken, setUser } = useAuthContext();
    const { setTanent, 
            tenant, 
            setShippingAddress, 
            setShippingPrice } = useAppContext();

    const formatter = libFormatter();
    const router = useRouter();
    const api = libApi(data.tenant.slug);

    const handleMenuEvent = (event: MouseEvent)=>{
        const tagName = (event.target as Element).tagName;

        if(!["path", "svg"].includes(tagName)){
            setMenuOpened(0);
        }
    }

    const handleAddressSelect = async (address: Address)=>{
        const price = await api.getShippingPrice(address);

        if(price){
            setShippingAddress(address);
            setShippingPrice(price);
            router.push(`/${data.tenant.slug}/checkout`);
        }
    }

    const handleAddressDelete = (id: number)=>{

    }

    const handleAddressEdit = (id: number)=>{
        router.push(`/${data.tenant.slug}/address/${id}`);
    }

    const handleNewAddress = ()=>{
        router.push(`/${data.tenant.slug}/address/new`);
    }

    useEffect(()=>{
        window.removeEventListener("click", handleMenuEvent);
        window.addEventListener("click", handleMenuEvent);
        return ()=> window.removeEventListener("click", handleMenuEvent);
    },[menuOpened]);

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`Novo Endereço | ${data.tenant.name}`}
            />
    
            <Header 
                backHref={`/${data.tenant.slug}/checkout`}
                color={data.tenant.mainColor}
                title="Novo Endereço"
            />

            <main className={styles.mainBody}>
                <div className={styles.list}>
                    {data.addresses?.map((item, index)=>{
                        return(
                            <AddressItem 
                                key={index}
                                address={item}
                                color={data.tenant.mainColor}
                                onDelete={handleAddressDelete}
                                onEdit={handleAddressEdit}
                                onSelect={handleAddressSelect}
                                menuOpened={menuOpened}
                                setMenuOpened={setMenuOpened}
                            />
                        );
                    })}
                </div>
                <div className={styles.btnArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Novo Endereço"
                        onClick={handleNewAddress}
                        fill
                    />
                </div>
            </main>

        </div>
    );
}

export default Newaddress;

type Props = {
    tenant: TenantProps;
    user: User | null;
    token: string;
    addresses?: Address[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = libApi(tenantSlug as string);
    const token = getCookie("token", context);
    const user = await api.authorizeToken(token as string);
    const tenant = await api.getTenant();
    

    if(!user){
        return { redirect: { destination: "/login", permanent: false } };
    }
    
    const addresses = await api.getUserAddresses(user.email as string);

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
            addresses
        }
    }
}