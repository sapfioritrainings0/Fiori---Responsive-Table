sap.ui.define([
    "org/products/controller/BaseController",
  //  "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "org/products/model/formatter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (BaseController,MessageToast,Filter,FilterOperator,formatter,Fragment,MessageBox,JSONModel) => {
    "use strict";

    return BaseController.extend("org.products.controller.View1", {
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
        
        },

        onAddProduct : function()
        {
            if(!this._pAddDialog)
            {
               this._pAddDialog = Fragment.load({
                id : this.getView().getId(),
                    name: "org.products.view.AddProduct",
                    controller: this
                }).then(function (oDialog){
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }

            this._pAddDialog.then(function(oDialog){
                oDialog.open();
                const obj = { ID: "", Name: "", Description: "", ReleaseDate: null, Rating: 0, Price: 0.00 };

                // Create a JSON model with the new product data
                const oModel = new JSONModel(obj);
                // Set the model to the view with a named model "newProduct"
                this.getView().setModel(oModel, "newProduct");
            }.bind(this));
            //this._pAddDialog.open();
        },

        onCloseDialog : function()
        {
            this._pAddDialog.then(function(oDialog){    
                oDialog.close();

            });

        },

        onCreateProduct : function()
        {
            const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            
            const oView = this.getView();
            //getting values using IDs
            // const sId = Fragment.byId(oView.getId(), "inputId").getValue();
            // const sName = Fragment.byId(oView.getId(), "inputName").getValue();
            // const sPrice = Fragment.byId(oView.getId(), "inputPrice").getValue();

           // const jsonModel = this.getView().getModel("newProduct");

           //Using Basecontroller to get model
            const jsonModel = this.getModel("newProduct");
            const productData = jsonModel.getData();
            productData.__metadata =  { type: "ODataDemo.Product" };


            if(!productData.ID || !productData.Name || !productData.Price) {
                const sMsg = oBundle.getText("requiredMsg");
                MessageBox.error(sMsg);
                return;
            }

            //getting values using IDs
            // if(!sId || !sName || !sPrice)
            // {
            //     const sMsg = oBundle.getText("requiredMsg");
            //     MessageBox.error(sMsg);
            //     return;
            // }

            // const oNewProduct = {
            //     __metadata: { type: "ODataDemo.Product" },
            //     ID: parseInt(sId,10),
            //     Name: sName,
            //     Description : Fragment.byId(oView.getId(), "inputDescription").getValue(),
            //     ReleaseDate: Fragment.byId(oView.getId(), "inputReleaseDate").getDateValue(),
            //     Rating: Fragment.byId(oView.getId(), "inputRating").getValue(),
            //     Price: parseFloat(sPrice)
            // };

            const that = this;

            const oModel = this.getView().getModel();
            const successMsg = oBundle.getText("successMsg");
            const errorMsg = oBundle.getText("errorMsg");
            oModel.create("/Products", productData, {

                success: function() {
                    MessageBox.success(successMsg);
                },
                error: function(error) {
                    MessageBox.error(oBundle.getText("errorMsg", [error.message]));
                }
            });

            this._pAddDialog.then(function(oDialog){
                oDialog.close();
            });


        }


    });
});