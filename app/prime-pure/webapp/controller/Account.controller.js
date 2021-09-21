sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend("prime.ui5.controller.Account",{
        onInit:function(){
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            console.log("RE");
            oRouter.getRoute("account").attachPatternMatched(this._onAccountIdRecieved, this);    
        },
        _onAccountIdRecieved: function (oEvent) {
            const id = window.decodeURIComponent(oEvent.getParameter("arguments").accountId);
            $.ajax({
                url: `http://localhost:8080/api/PrimeService/Accounts(${id})?$expand=device,plan,status,userMapping`,
                method: 'GET',
                success: (res)=>{
                    res.totalUser=res.userMapping.length;

                    this.getView().setModel(new JSONModel(res), "Account");
                    console.log(res);
                },
                error: (error)=>{
                    console.log(error)
                }
            });
        console.log("Hello",this.getView().getModel());
        }
    });
});