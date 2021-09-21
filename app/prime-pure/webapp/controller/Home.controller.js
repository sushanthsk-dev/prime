sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend("prime.ui5.controller.Home",{
        onInit: function(){
            console.log(this.getOwnerComponent().getModel("userModel"));
        },
        onAccountListPress: function(oEvent){
            let oRouter = this.getOwnerComponent().getRouter();
            window.history.go(-1);
        },
        onAccountListPress: function(oEvent){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("accounts");
        },
        onUsersPress: function(oEvent){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("usersAccount");
        },
        onuserAssociatedAccount: function() {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("accountsAssociatedUser");
        }
    })
});