sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',    
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "../model/formatter"
], function(Controller, JSONModel,FilterOperator,Filter,formatter) {
    'use strict';
    return Controller.extend("prime.ui5.controller.UsersAccount",{
        formatter: formatter,
        onInit:function(){
            $.ajax({
                url: 'http://localhost:8080/api/PrimeService/AccountUserMapings?$expand=user,account&$select=user,account',
                method: "GET",
                success: ({value})=>{
                    this.getView().setModel(new JSONModel(value),"AccountUsersModel");
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        },
        onSearchUser: function(){
            let aFilter = [];

            let sQuery = this.getView().byId("search-user").getValue();
            
            if(sQuery) {
                console.log("Chnage");
                aFilter.push(new Filter("user/firstName", FilterOperator.Contains,sQuery));
                let oList = this.byId("users-account-list");
                let oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            }
        },
        onPressUserCreate: function(){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("createUser");
        }
    })
});