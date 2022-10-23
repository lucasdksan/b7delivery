import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useApi } from "../../libs/useApi";
import { TenantProps } from "../../types/Tenant";
import styles from "../../styles/Login.module.css";
import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";

const Login = ( data:Props )=>{
    const { setTenant, tenant } = useAppContext();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(()=>{
        setTenant(data.tenant)
    },[]);

    const handleSubmit = ()=> {

    }

    const handleSignUp = ()=>{

    }

    return(
        <div className={styles.container}>
            <HeadComponent
                title={`Login | ${data.tenant.name}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
            />
            <h1 className={styles.headerName}>{data.tenant.name}</h1>
            <div className={styles.subTitleArea}>
                <span className={styles.subTitle}>Use suas credenciais para realizar o login.</span>
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
                    <Input
                        color={data.tenant.mainColor}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={setPassword}
                        password
                    />
                </fieldset>
                <fieldset className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Entrar"
                        onClick={handleSubmit}
                    />
                </fieldset>
            </form>
            <div className={styles.forgetArea}>
                Esqueceu sua senha? <Link className={styles.forgetButton} href={"/"}>Clique aqui</Link>
            </div>
            <div className={styles.signuArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Quero me cadastrar"
                    onClick={handleSignUp}
                    fill
                />
            </div>
        </div>
    );
}

export default Login;

type Props = {
    tenant: TenantProps;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi();

    const tenant = await api.getTenant(tenantSlug as string);

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