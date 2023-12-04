sap.ui.define([], () => {
    "use strict";

    return {
        formatterDate: (sDate) => {

            const data = new Date(sDate)

            return data.toLocaleString("pt-BR", {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })
        },

        formatterDateExt(sDate) {

            const data = new Date(sDate)

            return data.toLocaleString("pt-BR", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },

        statusOrder(sOrderDate, sShipDate) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            const dateOrder = new Date(sShipDate - sOrderDate).getTime();
            
            const diferencaEmMilissegundos = (dateOrder) / 1000 / 60 / 60 / 24;

            if (diferencaEmMilissegundos < 5) {
                return oResourceBundle.getText("OrdersStatusA");
            } else if (diferencaEmMilissegundos > 4 && diferencaEmMilissegundos < 10) {
                return oResourceBundle.getText("OrdersStatusB");
            } else {
                return oResourceBundle.getText("OrdersStatusC");
            }
        },

        statusFormatter: function (sOrderDate, sShipDate) {

            const dateOrder = new Date(sShipDate - sOrderDate).getTime();


            const diferencaEmMilissegundos = (dateOrder) / 1000 / 60 / 60 / 24;

            if (diferencaEmMilissegundos < 5) {
                return "Success"
            } else if (diferencaEmMilissegundos > 4 && diferencaEmMilissegundos < 10) {
                return "Warning"
            } else {
                return "Error"
            }

        },

        numberDecimals: function (nNumber) {
            if(!nNumber) {
                return nNumber
            }

            return Number(nNumber).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });

        },

        totalPrice(sUnitPrice, iQuantity) {

            const price = parseFloat(sUnitPrice)
            const qtde = iQuantity

            const total = qtde * price;

            return Number(total).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });

        }

    }
}
);