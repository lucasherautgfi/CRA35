sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/GroupHeaderListItem",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, GroupHeaderListItem, formatter, Filter, FilterOperator, MessageBox) {
	"use strict";

	return BaseController.extend("CRA35.controller.Detail", {

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
				hasUIChange: true,
				idMois: 0
			});
			this.getView().setModel(oViewModel, "detailModel");

			this.getRouter().getRoute("objectModif").attachPatternMatched(this._onObjectMatched, this);

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
		},

		onSave: function(oEvent) {
			var oList = this.byId("listeJour").getItems();
			for (var i = 0; i < oList.length; i++) {
				var oActivite = {};
				oActivite.idUser = 1;
				oActivite.mois = this.getModel("detailModel").getProperty("/idMois");
				oActivite.jour = oList[i].getCells()[0].getProperty("text");
				oActivite.type = oList[i].getCells()[1].getValue();
				oActivite.deplacement = oList[i].getCells()[2].getValue();
				oActivite.contrat = oList[i].getCells()[3].getValue();

				// this.getModel().update("/ActivityListSet(mois=" + this.getModel("detailModel").getProperty("/idMois") + ")", oActivite, null,
				// 	function() {
				// 		var msg = "Activités enregistrées";
				// 		MessageBox.show(msg);
				// 	},
				// 	function() {
				// 		alert("Error");
				// 	});
			}
			for (i = 0; i < 2; i++) {
				this.byId("idWizard").previousStep();
			}
			var msg = "Activités enregistrées";
			MessageBox.show(msg);
			this.onNavBack();
		},

		generalInfoHandler: function(oEvent) {
			var oType = this.byId("typeInput");
			var oDeplacement = this.byId("deplInput");
			var oContrat = this.byId("contratInput");
			var i;
			var oList = this.byId("listeJour").getItems();
			if (oType.getValue()) {
				for (i = 0; i < oList.length; i++) {
					if (oList[i].getCells()[1].getValue() === "") {
						oList[i].getCells()[1].setValue(oType.getValue());
					}
				}
			}

			if (oDeplacement.getValue()) {
				for (i = 0; i < oList.length; i++) {
					if (oList[i].getCells()[2].getValue() === "") {
						oList[i].getCells()[2].setValue(oDeplacement.getValue());
					}
				}
			}

			if (oContrat.getValue()) {
				for (i = 0; i < oList.length; i++) {
					if (oList[i].getCells()[3].getValue() === "") {
						oList[i].getCells()[3].setValue(oContrat.getValue());
					}
				}
			}

		},
		
		onNavBackDetail : function() {
			for (var i = 0; i < 2; i++) {
				this.byId("idWizard").previousStep();
			}
			this.onNavBack();
		}
	});

});