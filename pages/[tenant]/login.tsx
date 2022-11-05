import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../contexts/app";
import { libApi } from "../../libs/useApi";
import { TenantProps } from "../../types/Tenant";
import styles from "../../styles/Login.module.css";
import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";

const Login = ( data:Props )=>{
    const { setTanent, tenant } = useAppContext();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const router = useRouter();

    useEffect(()=>{
        setTanent(data.tenant);
    },[]);

    const handleSubmit = ()=> {

    }

    const handleSignUp = ()=>{
        router.push(`/${data.tenant.slug}/signup`);
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
                <span className={styles.subTitle} style={{borderBottomColor: data.tenant.mainColor}}>
                    Use suas credenciais para realizar o login.
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
                        fill
                    />
                </fieldset>
            </form>
            <div className={styles.forgetArea}>
                <div className={styles.contentLine} style={{borderBottomColor: data.tenant.mainColor}}>
                    <span className={styles.forgetArea_text}>Esqueceu sua senha?</span> <Link className={styles.forgetButton} style={{color: data.tenant.mainColor}} href={`/${data.tenant.slug}/forget`}><a style={{color: data.tenant.mainColor}}>Clique aqui</a></Link>
                </div>
            </div>
            <div className={styles.signuArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Quero me cadastrar"
                    onClick={handleSignUp}
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