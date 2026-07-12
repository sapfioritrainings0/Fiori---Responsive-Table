sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
   
], (Controller, History) => {
    "use strict";

    return Controller.extend("org.products.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("View2").attachPatternMatched(this._onRouteMatched, this);
            //this.calculateTotal();
        },

        _onRouteMatched: function (oEvent) {
            console.log("Route Matched");
            const oArgs = oEvent.getParameter("arguments");
            const productId = oArgs.productId;
            console.log("Product ID: " + productId);
        },

        onGoBackPress: function () {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1", {}, true);
            }
        }

        // List View 

        // calculateTotal: function (oEvent) {

        // }

       
    });
});