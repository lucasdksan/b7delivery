import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

import styles from "../../../styles/NewAddress.module.css";

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
import { useEffect, useState } from "react";
import Input from "../../../components/Input";

const Newaddress = ( data:Props )=>{
    const [ addressCep, setAddressCep ] = useState("");
    const [ addressStreet, setAddressStreet ] = useState("");
    const [ addressNumber, setAddressNumber ] = useState("");
    const [ addressNeighborhood, setAddressNeighborhood ] = useState("");
    const [ addressCity, setAddressCity ] = useState("");
    const [ addressState, setAddressState ] = useState("");
    const [ addressComplement, setAddressComplement ] = useState("");

    const { setToken, setUser } = useAuthContext();
    const { setTanent, 
            tenant, 
            setShippingAddress, 
            setShippingPrice } = useAppContext();

    const formatter = libFormatter();
    const router = useRouter();
    const api = libApi(data.tenant.slug);

    const handleNewAddress = ()=>{
        router.push(`/${data.tenant.slug}/address/new`);
    }

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
                <div className={styles.inputs}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>CEP</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite um CEP"
                                value={addressCep}
                                onChange={value => setAddressCep(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Rua</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite uma Rua"
                                value={addressStreet}
                                onChange={value => setAddressStreet(value)}
                            />
                        </div>
                        <div className={styles.column}>
                            <label className={styles.label}>Número</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite um número"
                                value={addressNumber}
                                onChange={value => setAddressNumber(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Bairro</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite um Bairro"
                                value={addressNeighborhood}
                                onChange={value => setAddressNeighborhood(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Cidade</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite uma cidade"
                                value={addressCity}
                                onChange={value => setAddressCity(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Estado</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite aqui o estado"
                                value={addressState}
                                onChange={value => setAddressState(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Complemento</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite aqui o complemento"
                                value={addressComplement}
                                onChange={value => setAddressComplement(value)}
                            />
                        </div>
                    </div>
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