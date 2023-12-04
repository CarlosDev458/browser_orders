sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, formatter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.lab2dev.sapui5browserorders.controller.View", {

            formatter: formatter,

            onInit: function () {
                const oData = this.getOwnerComponent().oData

                oData.read("/Orders", {
                    success: (data) => {

                        const oModel = new JSONModel(data.results);

                        this.getView().setModel(oModel, "Orders");
                    },
                    error: (error) => {
                        console.error(error)
                    }
                })
            },

            onSearch: function(oEvent) {
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("OrderID", FilterOperator.EQ, sQuery));
                }
                
                // filter binding
                const oList = this.byId("OrdersList");
                const oBinding = oList.getBinding("items");
    
                oBinding.filter(aFilter);

            },

            onListItemPress: function (oEvent) {

                const oItem = oEvent.getSource();

                const oRouter = this.getOwnerComponent().getRouter();
                
			    oRouter.navTo("detail", {
                    OrdersPath: window.encodeURIComponent(oItem.getBindingContext("Orders").getPath().substr(1))
                });

            }


        });
    });
