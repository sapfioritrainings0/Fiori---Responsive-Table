sap.ui.define([
"sap/ui/core/format/DateFormat",
"sap/ui/core/format/NumberFormat"
], (DateFormat, NumberFormat) => {
    "use strict";

    return  {

        formatDate : function (sDate) {
            if(!sDate) {
                return "";
        }

        const oDate = sDate instanceof Date ? sDate : new Date(sDate);
        const oDateFormat = DateFormat.getDateInstance({pattern: "dd-MM-yyyy"});

        return oDateFormat.format(oDate);
    },

      formatPrice : function (sPrice) {
        if(!sPrice) {
            return "";
        }

        const oNumberFormat = NumberFormat.getCurrencyInstance({
            maxFractionDigits: 2,
            minFractionDigits: 2
        });

        return "USD " + oNumberFormat.format(sPrice);
    }
      
    };
    });