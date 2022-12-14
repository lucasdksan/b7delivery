export const libFormatter = ()=>({
    formatPrice: function(price:number){
        return price.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
        });
    },
    
    formatQuantity: function(qt:number, minDigits:number){
        const remain = minDigits - qt.toString().length;
        
        if(qt.toString().length >= minDigits){
            return qt.toString();
        }

        return `${'0'.repeat(remain)}${qt}`;
    },

    formatDate: (date: string)=>{
        let currentDate = new Date(`${date} 00:00:00`);

        return new Intl.DateTimeFormat("pt-br").format(currentDate);
    }
})