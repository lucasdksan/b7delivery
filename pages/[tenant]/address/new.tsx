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
    const [ addressCep, setAddressCep ] = useState("");
    const [ addressStreet, setAddressStreet ] = useState("");
    const [ addressNumber, setAddressNumber ] = useState("");
    const [ addressNeighborhood, setAddressNeighborhood ] = useState("");
    const [ addressCity, setAddressCity ] = useState("");
    const [ addressState, setAddressState ] = useState("");
    const [ addressComplement, setAddressComplement ] = useState("");
    const [ errorFields, setErrorFields ] = useState<string[]>([]);

    const router = useRouter();
    const api = libApi(data.tenant.slug);

    const verifyAddress= ()=>{
        let newErrorFields = [];
        let approved = true;

        if(addressCep.replaceAll(/[^0-9]/g, '').length !== 8){
            newErrorFields.push("cep");
            approved=false;
        }

        if(addressStreet.length <= 2){
            newErrorFields.push("street");
            approved=false;
        }

        if(addressNeighborhood.length <= 2){
            newErrorFields.push("neighborhood");
            approved=false;
        }

        if(addressCity.length <= 2){
            newErrorFields.push("city");
            approved=false;
        }

        if(addressState.length !== 2){
            newErrorFields.push("state");
            approved=false;
        }

        setErrorFields(newErrorFields);
        return approved;
    }

    const handleNewAddress = async ()=>{
        if(verifyAddress()){    
            let address: Address = {
                cep: addressCep,
                city: addressCity,
                id: 0,
                neighborhood: addressNeighborhood,
                number: addressNumber,
                state: addressState,
                street: addressStreet,
                complement: addressComplement
            }

            let newAddress = await api.addUserAddress(address);

            if(newAddress.id > 0){
                router.push(`/${data.tenant.slug}/myaddress`);
            } else {
                alert("Ocorreu um erro! Tente mais tarde.");
            }
        }
    }

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`Novo Endere??o | ${data.tenant.name}`}
            />
    
            <Header 
                backHref={`/${data.tenant.slug}/myaddress`}
                color={data.tenant.mainColor}
                title="Novo Endere??o"
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
                                value={addressStreet}
                                onChange={value => setAddressStreet(value)}
                                warning={errorFields.includes("street")}
                            />
                        </div>
                        <div className={styles.column}>
                            <label className={styles.label}>N??mero</label>
                            <Input 
                                color={data.tenant.mainColor}
                                placeholder="Digite um n??mero"
                                value={addressNumber}
                                onChange={value => setAddressNumber(value)}
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
                                value={addressNeighborhood}
                                onChange={value => setAddressNeighborhood(value)}
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
                                value={addressCity}
                                onChange={value => setAddressCity(value)}
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
                                value={addressState}
                                onChange={value => setAddressState(value)}
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
                                value={addressComplement}
                                onChange={value => setAddressComplement(value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.btnArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Novo Endere??o"
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