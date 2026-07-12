sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "org/products/model/formatter"
], (Controller,MessageToast,Filter,FilterOperator,formatter) => {
    "use strict";

    return Controller.extend("org.products.controller.View1", {
        formatter: formatter,
        onInit() {
             
        },

        onItemPress : function (oEvent) {
            console.log("Item Pressed");
            const oItem = oEvent.getParameter("listItem") ;
            const oContext = oItem.getBindingContext();
           // const oRowObject = oContext.getObject();
           // const ID = oRowObject.ID;
           // const name = oRowObject.Name;
           // /Products/2
            const ID = oContext.getProperty("ID");
            this.getOwnerComponent().getRouter().navTo("View2", {
                productId: ID
            });
        },

        onSearchByName : function (oEvent) {

            const sQuery = oEvent.getParameter("query");
            const oList = this.getView().byId("idProductsTable");
            const oBinding = oList.getBinding("items");
            const oFilter = new Filter("Name", FilterOperator.Contains, sQuery);
            const aFilters = [oFilter];
            oBinding.filter(aFilters);
        },

        onSearchByRating : function (oEvent) {
             const sQuery = oEvent.getParameter("query");
            const oList = this.getView().byId("idProductsTable");
            const oBinding = oList.getBinding("items");
            const oFilter = new Filter("Rating", FilterOperator.EQ, sQuery);
            const aFilters = [oFilter];
            if(sQuery)
            oBinding.filter(aFilters);
        else
            oBinding.filter([]);
        },

        handleChange : function (oEvent) {
            const startDate = oEvent.getSource().getDateValue();
            const endDate = oEvent.getSource().getSecondDateValue();
             const oList = this.getView().byId("idProductsTable");
            const oBinding = oList.getBinding("items");

            const aFilters = [];
            if (startDate && endDate) {
                const oFilter = new Filter("ReleaseDate", FilterOperator.BT, startDate, endDate);
                aFilters.push(oFilter);
            }
            oBinding.filter(aFilters);
        },

        onSearch : function (oEvent) {
          MessageToast.show("Search Pressed");
        
        }
      
    });
});