sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend("prime.ui5.controller.User",{

        onInit:function(){
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.getRoute("account").attachPatternMatched(this._onObjectMatched, this);    
        },
        _onObjectMatched: function (oEvent) {
            const id = window.decodeURIComponent(oEvent.getParameter("arguments").accountId);
            $.ajax({
                url: `http://localhost:8080/api/PrimeService/Accounts(${id})?$expand=device,plan,status,userMapping`,
                method: 'GET',
                success: (res)=>{
                    this.getView().setModel(new JSONModel(res), "Account");
                    console.log(res);
                },
                error: (error)=>{
                    console.log(error)
                }
            });
        console.log(this.getView().getModel())
        }
    });
});