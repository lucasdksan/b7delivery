import { TenantProps } from './../types/Tenant';

export const useApi = ()=>({
    getTenant: (tenantSlug: string): boolean | TenantProps => {
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
    }

})