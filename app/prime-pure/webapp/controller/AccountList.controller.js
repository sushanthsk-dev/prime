sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageToast",
], function(Controller,JSONModel,FilterOperator,
	Filter,MessageToast) {
    'use strict';
    return Controller.extend("prime.ui5.Controller.AccountList",{
        onInit: function(){

            $.ajax({
                url: 'http://localhost:8080/api/PrimeService/Accounts?$expand=device,plan,status',
                method:'GET',
                success: ({value})=>{
                    this.getView().setModel(new JSONModel(value), "AccountList")
                    console.log(this.getView().getModel("AccountList"));
                },
                error: (erro)=>{
                    console.log(erro);
                }
            });
        },
        onSearchAccount: function(oEvent){
            let aFilter = [];
            let sQuery = this.getView().byId("search-account").getValue();
            if(sQuery) {
                aFilter.push(new Filter("description", FilterOperator.Contains,sQuery));
                let oList = this.byId("account-list");
                let oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            }
        },

        onPressAccountCreate: function(oEvent){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("createAccount");
        },

        onPressAccount: function(oEvent){
            let oItem = oEvent.getSource();
            let oRouter = this.getOwnerComponent().getRouter();
            const index=oItem.getBindingContext("AccountList").getPath().substr(1);
            const oData = this.getView().getModel("AccountList").getData();
            oRouter.navTo("account",{
                accountId: window.encodeURIComponent(oData.at(index).ID)
            });
        }
    })
});