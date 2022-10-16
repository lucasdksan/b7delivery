import Banner from "../../components/Banner";
import SearchInput from "../../components/SearchInput";
import styles from "../../styles/Home.module.css";

const Home = ()=>{
    const handlerSearch = (value: string)=> {
        console.log(`Apenas um teste ${value}`);
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <h1 className={styles.headerTitle}>Seja Bem Vindo (a) 👋</h1>
                        <span className={styles.headerSubTitle}>O que deseja pra hoje?</span>
                    </div>
                    <div className={styles.headerTopRight}>
                        <div className={styles.menuButton}>
                            <span className={styles.menuButtonLines}></span>
                            <span className={styles.menuButtonLines}></span>
                            <span className={styles.menuButtonLines}></span>
                        </div>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput 
                        mainColor="#FB9400"
                        onButtonClick={handlerSearch}
                    />
                </div>
            </header>
            <main className={styles.body}>
                <Banner />
            </main>
        </div>
    );
}

export default Home;