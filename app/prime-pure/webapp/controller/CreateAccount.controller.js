sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageToast",
], function (Controller,JSONModel,MessageToast) {
    'use strict';
    const validateText= (text)=> /^[a-zA-Z]+$/.test(text)

    return Controller.extend("prime.ui5.controller.CreateAccount", {

        onCreateAccountPress: function (oEvent) {
            const accountId = this.getView().byId("accountId").getValue();
            const accountName = this.getView().byId("accountName").getValue();
            const device = this.getView().byId("device").getSelectedItem().getKey();
            const plan = this.getView().byId("plan").getSelectedItem().getKey();
            const cost = this.getView().byId("cost").getValue();
            if(!accountId) {
               return MessageToast.show("Account Id is required",{duration:1000});
            }
            if(!accountName) {
               return MessageToast.show("Account name is required",{duration:1000});
            }
            if(!cost) {
               return MessageToast.show("Cost  is required",{duration:1000});
            }
            if(!Number.isInteger(parseInt(cost))) {
                return MessageToast.show("Please enter valid price",{duration:1000});
            }
            if(cost >1000 || cost < 1) {
                return MessageToast.show("Please enter cost below 1000 and above 1",{duration:1000});
            }
            if(!validateText(accountName)) {
                return MessageToast.show("Please enter only alphabets");
            }

            $.ajax({
                url : "/api/PrimeService/Accounts",
                headers: {"Content-Type": "application/json"},
                method:"POST",
                crossDomain: true,
               data: {
                accountId: accountId,
                accountName:  accountName,
                device_code: device,
                plan_code:  plan,
                cost: cost
               },
               success: (res)=>{
                   console.log(res);
                   MessageToast.show("Account Created successfully");
                   let oRouter = this.getOwnerComponent().getRouter();
                   oRouter.navTo("usersAccount");
               },
               error: (err)=>{
                   console.log(err);
               }
            });
        }
    });
});