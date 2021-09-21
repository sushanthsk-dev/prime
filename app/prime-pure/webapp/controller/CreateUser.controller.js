sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageToast",
], function (Controller,JSONModel,MessageToast) {
    'use strict';
    const validateText= (text)=> /^[a-zA-Z]+$/.test(text)

    return Controller.extend("prime.ui5.controller.CreateAccount", {

        onCreateAccountPress: function (oEvent) {
            

            const userId = this.getView().byId("userId").getValue();
            const firstName = this.getView().byId("firstName").getValue();
            const lastName = this.getView().byId("lastName").getValue();
            if(!userId) {
               return MessageToast.show("User Id is required",{duration:1000});
            }
            if(!firstName) {
               return MessageToast.show("Account name is required",{duration:1000});
            }
            if(!lastName) {
               return MessageToast.show("Cost  is required",{duration:1000});
            }
            if(!validateText(firstName)) {
                return MessageToast.show("Please enter only alphabets",{duration:1000});
            }
            if(!validateText(lastName)) {
                return MessageToast.show("Please enter only alphabets",{duration:1000});
            }

            $.ajax({
                url : "/api/PrimeService/Users",
                headers: {"Content-Type": "application/json"},
                method:"POST",
                crossDomain: true,
               data: {
                userId: userId,
                firstName:firstName,
                lastName:lastName
               },
               success: (res)=>{
                   MessageToast.show("User created successfully");
                   let oRouter = this.getOwnerComponent().getRouter();
                   oRouter.navTo("usersAccount");
                   console.log(res);
               },
               error: (err)=>{
                   console.log(err);
               }
            });
        }
    });
});