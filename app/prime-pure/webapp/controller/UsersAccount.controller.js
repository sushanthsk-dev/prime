sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',    
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
], function(Controller, JSONModel,FilterOperator,Filter) {
    'use strict';
    return Controller.extend("prime.ui5.controller.UsersAccount",{

        onInit:function(){
            console.log("AGA");
            $.ajax({
                url: 'http://localhost:8080/api/PrimeService/Users',
                method: "GET",
                success: ({value})=>{
                    this.getView().setModel(new JSONModel(value),"Users");
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        },
        onSearchUser: function(oEvent){
            let aFilter = [];
            let sQuery = this.getView().byId("search-user").getValue();
            if(sQuery) {
                aFilter.push(new Filter("firstName", FilterOperator.Contains,sQuery));
                let oList = this.byId("users-list");
                let oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            }
        },
        onPressUserCreate: function(oEvent){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("createUser");
        }
    })
});