import { GetServerSideProps } from "next";
import { useEffect } from "react";
import HeadComponent from "../../../components/HeadComponent";
import { useAppContext } from "../../../contexts/AppContext";
import { libApi } from "../../../libs/useApi";
import styles from "../../../styles/Product-id.module.css";
import { Product } from "../../../types/Product";
import { TenantProps } from "../../../types/Tenant";

const ProductPage = ( data:Props )=>{
    const { setTenant, tenant } = useAppContext();

    useEffect(()=>{
        setTenant(data.tenant)
    },[]);

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={`${data.product.name} | ${data.tenant.name}`}
            />
        </div>
    );
}

export default ProductPage;

type Props = {
    tenant: TenantProps;
    product: Product;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    const api = libApi(tenantSlug as string);

    const tenant = await api.getTenant();
    const product = await api.getProduct(id as string);

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
            product
        }
    }
}