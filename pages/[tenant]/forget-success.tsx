import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/ForgetSuccess.module.css";

import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Icon from "../../components/Icon";

import { useAppContext } from "../../contexts/app";

import { libApi } from "../../libs/useApi";

import { TenantProps } from "../../types/Tenant";

const ForgetSuccess = (data:Props)=>{
    const { setTanent, tenant } = useAppContext();

    const [ email, setEmail ] = useState("");
    const router = useRouter();

    useEffect(()=>{
        setTanent(data?.tenant);
    },[]);

    const handleSubmit = (e:FormEvent)=> {
        e.preventDefault();
        router.push(`/${data.tenant.slug}/login`);
    }

    return(
        <div className={styles.container}>
            <HeadComponent
                title={`Esqueci a senha | ${data.tenant.name}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}/forget`}
                color={data.tenant.mainColor}
            />
            <div className={styles.iconArea}>
                <Icon 
                    icon="mailSent" 
                    color={data.tenant.mainColor}
                    width={99}
                    height={81}
                />
            </div>
            <div className={styles.subTitleArea}>
                <span className={styles.subTitleHeader}>Verifique seu e-mail</span>
                <span className={styles.subTitle}>
                    Enviamos as instruções para recuperação de senha para o seu e-mail.
                </span>
            </div>
            <form 
                className={styles.formArea}
                onSubmit={handleSubmit}
            >
                <fieldset className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Fazer login"
                        type="submit"
                        fill
                    />
                </fieldset>
            </form>
        </div>
    );
}

export default ForgetSuccess;

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