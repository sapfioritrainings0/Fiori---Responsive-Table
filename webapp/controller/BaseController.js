sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("org.products.controller.BaseController", {
      
    getModel : function (sName) {
      return this.getView().getModel(sName);
    },

    onGoBackPress: function (routeName) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo(routeName, {}, true);
            }
        }
  });
});