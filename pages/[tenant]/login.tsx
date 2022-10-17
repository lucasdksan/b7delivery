import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useApi } from "../../libs/useApi";
import { TenantProps } from "../../types/Tenant";
import styles from "../../styles/Login.module.css";
import HeadComponent from "../../components/HeadComponent";

const Login = ( data:Props )=>{
    const { setTenant, tenant } = useAppContext();

    useEffect(()=>{
        setTenant(data.tenant)
    },[]);


    return(
        <div className={styles.container}>
            <HeadComponent
                title={`Login | ${data.tenant.name}`}
            />
            
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