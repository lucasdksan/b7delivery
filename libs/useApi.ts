import { CartItem } from '../types/CartItem';
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

        const cartJson = JSON.parse(cartCookie);

        if(!cartCookie) return cart;

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

    }
})