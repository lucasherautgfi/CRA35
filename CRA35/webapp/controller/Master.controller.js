sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/GroupHeaderListItem",
	"../model/formatter"
], function(BaseController, JSONModel, GroupHeaderListItem, formatter) {
	"use strict";

	return BaseController.extend("CRA35.controller.Master", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
		 * @public
		 */
		onInit: function() {

		},

		onSelectMonth: function(oEvent) {
			
			if(oEvent.getSource().getBindingContext().getProperty("modif") === "X"){
				this.getRouter().navTo("objectModif", {
					objectId: oEvent.getSource().getBindingContext().getProperty("idMois")
				});
			}else{
				this.getRouter().navTo("object", {
					objectId: oEvent.getSource().getBindingContext().getProperty("idMois")
				});
			}
			
		}
	});
});