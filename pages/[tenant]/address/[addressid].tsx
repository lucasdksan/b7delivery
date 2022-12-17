import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

import styles from "../../../styles/NewAddress.module.css";

import HeadComponent from "../../../components/HeadComponent";
import Header from "../../../components/Header";
import Button from "../../../components/Button";

import { libApi } from "../../../libs/useApi";

import { TenantProps } from "../../../types/Tenant";
import { User } from "../../../types/User";

import { Address } from "../../../types/Address";
import { useState } from "react";
import Input from "../../../components/Input";

const Newaddress = ( data:Props )=>{
    const [ address, setAddress ] = useState<Address>(data.address);
    const [ errorFields, setErrorFields ] = useState<string[]>([]);

    const router = useRouter();
    const api = libApi(data.tenant.slug);

    const verifyAddress= ()=>{
        let newErrorFields = [];
        let approved = true;

        if(address.cep.replaceAll(/[^0-9]/g, '').length !== 8){
            newErrorFields.push("cep");
            approved=false;
        }

        if(address.street.length <= 2){
            newErrorFields.push("street");
            approved=false;
        }

        if(address.neighborhood.length <= 2){
            newErrorFields.push("neighborhood");
            approved=false;
        }

        if(address.city.length <= 2){
            newErrorFields.push("city");
            approved=false;
        }

        if(address.state.length !== 2){
            newErrorFields.push("state");
            approved=false;
        }

        setErrorFields(newErrorFields);
        return approved;
    }

    const changeAddressField = (
            element: keyof Address, 
            value: typeof address[keyof Address]
        )=>{
            setAddress({ ...address, [element]:value });
    }

    const handleNewAddress = async ()=>{
        if(verifyAddress()){ 
            await api.editUserAddress(address);

            router.push(`/${data.tenant.slug}/myaddress`);
        }
    }

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`Novo Endereço | ${data.tenant.name}`}
            />
    
            <Header 
                backHref={`/${data.tenant.slug}/myaddress`}
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
                                value={address.cep}
                                onChange={value => changeAddressField("cep",value)}
                                warning={errorFields.includes("cep")}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Rua</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite uma Rua"
                                value={address.street}
                                onChange={value => changeAddressField("street",value)}
                                warning={errorFields.includes("street")}
                            />
                        </div>
                        <div className={styles.column}>
                            <label className={styles.label}>Número</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite um número"
                                value={address.number}
                                onChange={value => changeAddressField("number",value)}
                                warning={errorFields.includes("number")}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Bairro</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite um Bairro"
                                value={address.neighborhood}
                                onChange={value => changeAddressField("neighborhood",value)}
                                warning={errorFields.includes("neighborhood")}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Cidade</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite uma cidade"
                                value={address.city}
                                onChange={value => changeAddressField("city",value)}
                                warning={errorFields.includes("city")}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Estado</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite aqui o estado"
                                value={address.state}
                                onChange={value => changeAddressField("state",value)}
                                warning={errorFields.includes("state")}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label className={styles.label}>Complemento</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite aqui o complemento"
                                value={address.complement as string ?? ""}
                                onChange={value => changeAddressField("complement",value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.btnArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Atualizar"
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
    address: Address;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, addressid } = context.query;
    const api = libApi(tenantSlug as string);
    const token = getCookie("token", context);
    const user = await api.authorizeToken(token as string);
    const tenant = await api.getTenant();
    

    if(!user){
        return { redirect: { destination: "/login", permanent: false } };
    }
    
    const address = await api.getUserAddress(Number(addressid));

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
            address
        }
    }
}