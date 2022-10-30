export const libFormatter = ()=>({
    formatPrice: function(price:number){
        return price.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
        });
    }
})