sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History'
], function(Controller,History) {
    'use strict';
    return Controller.extend("prime.ui5.controller.App",{

        /**
         * @override
         */
        // onInit: function() {
        //     fetch("http://localhost:8080/guests").then((guests)=>console.log(guests)).catch((e)=>console.log(e));
        // },
        onNavBack: function(){
            let oHistory = History.getInstance();
            let sPrevHash = oHistory.getPreviousHash();
            if(sPrevHash !==undefined){
                window.history.go(-1);
            } else{
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("home");
            }
        }
    })
});