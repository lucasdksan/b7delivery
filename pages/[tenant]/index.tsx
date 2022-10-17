import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Banner from "../../components/Banner";
import HeadComponent from "../../components/HeadComponent";
import ProductItem from "../../components/ProductItem";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../contexts/AppContext";
import { useApi } from "../../libs/useApi";
import styles from "../../styles/Home.module.css";
import { TenantProps } from "../../types/Tenant";

const Home = ( data:Props )=>{
    const { setTenant, tenant } = useAppContext();

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
                    <ProductItem 
                        data={{
                            id: 1,
                            categoryName: "Tradiconal",
                            image: "/tmp/burger.png",
                            name: "Golden Burger",
                            price: "25,50",
                        }}
                    />
                    <ProductItem 
                        data={{
                            id: 2,
                            categoryName: "Tradiconal",
                            image: "/tmp/burger.png",
                            name: "Golden Burger",
                            price: "25,50",
                        }}
                    />
                    <ProductItem 
                        data={{
                            id: 3,
                            categoryName: "Tradiconal",
                            image: "/tmp/burger.png",
                            name: "Golden Burger",
                            price: "25,50",
                        }}
                    />
                    <ProductItem 
                        data={{
                            id: 4,
                            categoryName: "Tradiconal",
                            image: "/tmp/burger.png",
                            name: "Golden Burger",
                            price: "25,50",
                        }}
                    />
                </div>
            </main>
        </div>
    );
}

export default Home;

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