import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../contexts/app";
import { libApi } from "../../libs/useApi";
import { TenantProps } from "../../types/Tenant";
import styles from "../../styles/Forget.module.css";
import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ForGet = ( data:Props )=>{
    const { setTanent, tenant } = useAppContext();
    const [ email, setEmail ] = useState("");
    const router = useRouter();

    useEffect(()=>{
        setTanent(data.tenant);
    },[]);

    const handleSubmit = ()=> {
        router.push(`/${data.tenant.slug}/forget-success`);
    }

    return(
        <div className={styles.container}>
            <HeadComponent
                title={`Esqueci a senha | ${data.tenant.name}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}/login`}
                color={data.tenant.mainColor}
            />
            <h1 className={styles.headerName}>{data.tenant.name}</h1>
            <div className={styles.subTitleArea}>
                <span className={styles.subTitleHeader}>Esqueceu sua senha?</span>
                <span className={styles.subTitle} style={{borderBottomColor: data.tenant.mainColor}}>
                    Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir  a sua senha.
                </span>
            </div>
            <form className={styles.formArea}>
                <fieldset className={styles.inputArea}>
                    <Input
                        color={data.tenant.mainColor}
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={setEmail}
                    />
                </fieldset>
                <fieldset className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Enviar"
                        onClick={handleSubmit}
                        fill
                    />
                </fieldset>
            </form>
        </div>
    );
}

export default ForGet;

type Props = {
    tenant: TenantProps;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = libApi(tenantSlug as string);

    const tenant = await api.getTenant();

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
            tenant
        }
    }
}