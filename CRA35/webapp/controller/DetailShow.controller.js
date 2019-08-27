sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/GroupHeaderListItem",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, GroupHeaderListItem, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("CRA35.controller.DetailShow", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
		 * @public
		 */
		onInit: function() {

			var oViewModel = new JSONModel({
				idMois: 0
			});
			this.getView().setModel(oViewModel, "detailModel");

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function(oEvent) {
			var aFilter = [];
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel("detailModel").setProperty("/idMois", sObjectId);
			if (sObjectId && sObjectId > 0) {
				aFilter.push(new Filter("mois", FilterOperator.EQ, sObjectId));
			}
			var oList = this.byId("listeJour");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});