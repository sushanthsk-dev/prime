sap.ui.define([], function () {
    "use strict"
    return {
        statusText: function (sStatus) {
            switch (sStatus) {
                case 0:
                    return "Expired";
                case 1:
                    return "Active";
                default: 
                    return "N/A";
            }
        },

        planText: function (deviceCode){
            switch(deviceCode) {
                case 0: 
                    return "Silver";
                case 1: 
                    return "Gold";
                case 2: 
                    return "Diamond";
                case 3: 
                    return "Platinum";
                default:
                    return "N/A";
            }
        },
        deviceText: function (deviceCode){
            switch(deviceCode) {
                case 0: 
                    return "Mobile";
                case 1: 
                    return "PC";
                case 2: 
                    return "Tab";
 
                default:
                    return "N/A";
            }
        }
    }
})