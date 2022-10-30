import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import HeadComponent from "../../components/HeadComponent";
import ProductItem from "../../components/ProductItem";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../contexts/AppContext";
import { libApi } from "../../libs/useApi";
import styles from "../../styles/Home.module.css";
import { Product } from "../../types/Product";
import { TenantProps } from "../../types/Tenant";

const Home = ( data:Props )=>{
    const { setTenant, tenant } = useAppContext();
    const [ products, setProducts] = useState<Product[]>(data.products);

    useEffect(()=>{
        setTenant(data.tenant)
    },[]);

    const handlerSearch = (value: string)=> {
        console.log(`Apenas um teste ${value}`);
    }

    return(
        <div className={styles.container}>
            <HeadComponent 
                title={data.tenant.name}
            />
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <h1 className={styles.headerTitle}>Seja Bem Vindo (a) 👋</h1>
                        <span className={styles.headerSubTitle}>O que deseja pra hoje?</span>
                    </div>
                    <div className={styles.headerTopRight}>
                        <div className={styles.menuButton}>
                            <span className={styles.menuButtonLines} style={{backgroundColor: tenant?.mainColor}}></span>
                            <span className={styles.menuButtonLines} style={{backgroundColor: tenant?.mainColor}}></span>
                            <span className={styles.menuButtonLines} style={{backgroundColor: tenant?.mainColor}}></span>
                        </div>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput
                        onButtonClick={handlerSearch}
                    />
                </div>
            </header>
            <main className={styles.body}>
                <Banner />

                <div className={styles.grid}>
                    {
                        products.map((element, index)=>{
                            return(
                                <ProductItem
                                    key={index}
                                    data={element}
                                />
                            )
                        })
                    }
                </div>
            </main>
        </div>
    );
}

export default Home;

type Props = {
    tenant: TenantProps;
    products: Product[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = libApi(tenantSlug as string);

    const tenant = await api.getTenant();
    const products = await api.getAllProducts();

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
            products
        }
    }
}