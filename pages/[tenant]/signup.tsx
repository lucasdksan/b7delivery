import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../contexts/app";
import { libApi } from "../../libs/useApi";
import { TenantProps } from "../../types/Tenant";
import styles from "../../styles/Signup.module.css";
import HeadComponent from "../../components/HeadComponent";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";

const SignUp = ( data:Props )=>{
    const { tenant, setTanent } = useAppContext();
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const router = useRouter();

    useEffect(()=>{
        setTanent(data.tenant);
    },[]);

    const handleSubmit = ()=> {

    }

    return(
        <div className={styles.container}>
            <HeadComponent
                title={`Cadastro | ${data.tenant.name}`}
            />
            <Header 
                backHref={`/${data.tenant.slug}/login`}
                color={data.tenant.mainColor}
            />
            <h1 className={styles.headerName}>{data.tenant.name}</h1>
            <div className={styles.subTitleArea}>
                <span className={styles.subTitle} style={{borderBottomColor: data.tenant.mainColor}}>
                    Preencha os campos para criar o seu cadastro.
                </span>
            </div>
            <form className={styles.formArea}>
                <fieldset className={styles.inputArea}>
                    <Input
                        color={data.tenant.mainColor}
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={setName}
                    />
                </fieldset>
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
                        label="Cadastrar"
                        onClick={handleSubmit}
                        fill
                    />
                </fieldset>
            </form>
            <div className={styles.forgetArea}>
                <div className={styles.contentLine} style={{borderBottomColor: data.tenant.mainColor}}>
                    <span className={styles.forgetArea_text}>Já tem cadastro?</span> <Link className={styles.forgetButton} style={{color: data.tenant.mainColor}} href={`/${data.tenant.slug}/login`}><a style={{color: data.tenant.mainColor}}>Clique aqui</a></Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

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