import Head from "next/head";

type HeadComponentProps = {
    title: string;
}

const HeadComponent = ({ title }:HeadComponentProps)=>{
    return(
        <Head>
            <title>{title}</title>
            <meta name="author" content="Lucas da Silva" />
            <meta property="og:url" content="www.b7delivery.com.br" />
            <meta name="keywords" content="delivery, nordeste delivery, vendas, ecommerce, Vendas de produtos" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content="Saas responsáveis por conectar o vendedor ao seu cliente, gerando assim formas de venda dos produtos e formas de entrega Cliente ao consumidor." />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content="Saas responsáveis por conectar o vendedor ao seu cliente, gerando assim formas de venda dos produtos e formas de entrega Cliente ao consumidor." />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:site_name" content={title} />
            <meta property="og:image:alt" content="Boost yourself" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="next-head-count" content="43" />
        </Head>
    );
}

export default HeadComponent;