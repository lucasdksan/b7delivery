import { Address } from '../types/Address';
import { CartItem } from '../types/CartItem';
import { Order } from '../types/Order';
import { Product } from '../types/Product';
import { User } from '../types/User';
import { TenantProps } from './../types/Tenant';

const TEMPORARYoneProduct:Product = {
    id: 1,
    image: "/tmp/burger.png",
    categoryName: "Tradiconal",
    name: "Golden Burger",
    price: 25.5,
    description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal,",
    max: 10,
    min: 1,
}

const TEMPORARYorder:Order = {
    id: 123,
    status: "preparing",
    orderDate: "2022-12-04",
    userid: "134",
    shippingAddress: {
        id: 2,
        cep: "123456879",
        city: "Parnamirim",
        neighborhood: "Parnamirim Favela",
        number: `${1}00`,
        state: "RN", 
        street: "Rua Capitão Martinho Machado"
    },
    shippingPrice: 9.55,
    paymentType: "card",
    coupon: "DJRogerim",
    couponDiscount:14.50,
    products: [
        { product: { ...TEMPORARYoneProduct, id:1 }, qt: 1 },
        { product: { ...TEMPORARYoneProduct, id:1 }, qt: 5 },
        { product: { ...TEMPORARYoneProduct, id:1 }, qt: 1 }
    ],
    subtotal: 205,
    total: 190.5
}

export const libApi = (tenantSlug: string)=>({
    getTenant: async (): Promise<boolean | TenantProps> => {
        switch(tenantSlug){
            case "b7burger":
                return {
                    slug: "b7burger",
                    name: "B7burger",
                    mainColor: "#FB9400",
                    secondColor: "#FFF9F2",
                }
            break;
            case "calangoPzz": 
                return {
                    slug: "calangoPzz",
                    name: "CalangoPzz",
                    mainColor: "#6f9ceb",
                    secondColor: "#141b41",
                }
            break;
            default: return false;
        }
    },

    getAllProducts: async ()=>{
        let products = [];

        for(var q = 0; q < 10; q++){
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1,
            });
        }

        return products;
    },

    getProduct: async (id: number)=>{
        return { ...TEMPORARYoneProduct, id };
    },

    authorizeToken: async (token: string):Promise<User | false> =>{
        if(!token) return false;

        return {
            name: "Lucas da Silva",
            email: "lucas.silva@gmail.com"
        }
    },

    getCartProducts: async (cartCookie: string)=>{
        let cart: CartItem[] = [];
        let product;

        if(!cartCookie) return cart;

        const cartJson = JSON?.parse(cartCookie);

        for(let i in cartJson){
            if(cartJson[i].id && cartJson[i].qt){
                product = {
                    ...TEMPORARYoneProduct,
                    id: cartJson[i].id
                }

                cart.push({
                    qt: cartJson[i].qt,
                    product
                });
            }
        }

        return cart;

    },

    getUserAddresses: async (email: string)=>{
        const addresses: Address[] = [];

        for(let i = 0; i < 4; i++){
            addresses.push({
                cep: "123456879",
                city: "Parnamirim",
                id:  i + 1,
                neighborhood: "Parnamirim Favela",
                number: `${i+1}00`,
                state: "RN", 
                street: "Rua Capitão Martinho Machado"
            });
        }

        return addresses;
    },

    getShippingPrice: async (address: Address)=>{
        return 9.20;
    },

    addUserAddress: async (address: Address)=>{
        return {
            ...address,
            id: 10
        }
    },

    getUserAddress: async (id: number)=>{
        let address:Address =  {
            id,
            cep: "123456879",
            city: "Parnamirim",
            neighborhood: "Parnamirim Favela",
            number: `${id+1}00`,
            state: "RN", 
            street: "Rua Capitão Martinho Machado"
        }

        return address;
    },

    editUserAddress: async (address: Address)=>{
        return true;
    },

    deleteUserAddress: async (id: number) => {
        return true;
    },

    setOrder: async (
            address:Address, 
            paymentType: "money"|"card", 
            paymentChange: number, 
            coupon: string, 
            cart: CartItem[]
        )=>{
            return TEMPORARYorder;
    },

    getOrder: async function(id: number){
        return TEMPORARYorder;
    }
})