sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], (Controller, JSONModel, formatter) => {
	"use strict";
	
	return Controller.extend("com.lab2dev.browserorders.controller.Detail", {

		formatter: formatter,

		onInit() {
			const oData = this.getOwnerComponent().oData
			
			oData.read("/Orders", {
				urlParameters: {
					'$expand': "Order_Details/Product"
				},

				success: (data) => {

					const oModel = new JSONModel(data.results);

					this.getView().setModel(oModel, "Orders");
				},
				error: (error) => {
					console.error(error)
				}
			})

			const oRouter = this.getOwnerComponent().getRouter();

			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);

		},

		onObjectMatched(oEvent) {

			// Este método é usado para vincular um elemento específico na visão a um caminho no modelo de dados.
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").OrdersPath,
				model: "Orders"
			});

		}
	});
});