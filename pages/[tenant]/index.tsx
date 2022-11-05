import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import HeadComponent from "../../components/HeadComponent";
import ProductItem from "../../components/ProductItem";
import SearchInput from "../../components/SearchInput";
import SideBar from "../../components/SideBar";
import { useAppContext } from "../../contexts/app";
import { libApi } from "../../libs/useApi";
import styles from "../../styles/Home.module.css";
import { Product } from "../../types/Product";
import { TenantProps } from "../../types/Tenant";

const Home = ( data:Props )=>{
    const { setTanent, tenant } = useAppContext();

    const [ products, setProducts] = useState<Product[]>(data.products);
    const [ sideBarOpen, setSideBarOpen ] = useState(false);

    useEffect(()=>{
        setTanent(data.tenant);
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
                        <button 
                            className={styles.menuButton}
                            onClick={()=>setSideBarOpen(true)}
                        >
                            <span className={styles.menuButtonLines} style={{backgroundColor: tenant?.mainColor}}></span>
                            <span className={styles.menuButtonLines} style={{backgroundColor: tenant?.mainColor}}></span>
                            <span className={styles.menuButtonLines} style={{backgroundColor: tenant?.mainColor}}></span>
                        </button>
                        <SideBar 
                            tenant={data.tenant}
                            open={sideBarOpen}
                            onClose={()=>setSideBarOpen(false)}
                        />
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