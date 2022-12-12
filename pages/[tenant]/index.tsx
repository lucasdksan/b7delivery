import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import styles from "../../styles/Home.module.css";

import Banner from "../../components/Banner";
import HeadComponent from "../../components/HeadComponent";
import ProductItem from "../../components/ProductItem";
import SearchInput from "../../components/SearchInput";
import SideBar from "../../components/SideBar";

import { libApi } from "../../libs/useApi";

import { Product } from "../../types/Product";
import { TenantProps } from "../../types/Tenant";
import { User } from "../../types/User";

import { useAuthContext } from "../../contexts/auth";
import { useAppContext } from "../../contexts/app";

import NotFoundIcon from "../../public/assets/notFoundIcon.svg";

const Home = ( data:Props )=>{
    const { setToken, setUser } = useAuthContext();
    const { setTanent, tenant } = useAppContext();

    const [ products, setProducts] = useState<Product[]>(data.products);
    const [ filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [ sideBarOpen, setSideBarOpen ] = useState(false);
    const [ searchText, setSearchText ] = useState("");

    useEffect(()=>{
        setTanent(data.tenant);
        setToken(data.token);
        if(data.user) setUser(data.user);
    },[]);

    useEffect(()=>{
        let newFilteredProducts:Product[] = [];

        for(let product of data.products){
            if(product.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1){
                newFilteredProducts.push(product);
            }
        }

        setFilteredProducts(newFilteredProducts);
    },[searchText]);

    const handlerSearch = (value: string)=> {
        setSearchText(value);
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
                {
                    searchText &&
                    <>
                        <div className={styles.searchText}>
                            <span>Procurando por: <strong>{searchText}</strong></span>
                        </div>
                        {
                            filteredProducts.length > 0 &&
                            <div className={styles.grid}>
                                {
                                    filteredProducts.map((item, index)=>{
                                        return(
                                            <ProductItem
                                                key={index}
                                                data={item}
                                            />
                                        );
                                    })
                                }
                            </div>
                        }
                        {
                            filteredProducts.length === 0 &&
                            <div className={styles.noProducts}>
                                <div className={styles.iconArea}>
                                    <NotFoundIcon color="#E0E0E0"/>
                                </div>
                                <span className={styles.noProductsText}>
                                    Ops! Não há itens com este nome
                                </span>
                            </div>
                        }
                    </>
                }
                {
                    !searchText && 
                    <>
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
                    </>
                }
            </main>
        </div>
    );
}

export default Home;

type Props = {
    tenant: TenantProps;
    products: Product[];
    user: User | null;
    token: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = libApi(tenantSlug as string);
    const token = getCookie("token", context);
    const user = await api.authorizeToken(token as string);

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

    if(token){
        return {
            props: {
                tenant,
                products,
                user,
                token: token as string
            }
        }
    } else {
        return {
            props: {
                tenant,
                products,
                user
            }
        }
    }
}