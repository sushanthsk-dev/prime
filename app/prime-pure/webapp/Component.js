sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("prime.ui5.Component",{
        metadata:{
            manifest:'json'
        },
        init: function(){
            UIComponent.prototype.init.apply(this,arguments);
            this.getRouter().initialize();
        }
    })
    
});