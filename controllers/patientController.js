const sanitizer = require("../schema/patientSchema");
const {objectId} = require("mongodb");

module.exports = {
	patientForm: async (ctx) => {
		const modelUser = require("../models/patientModel")(ctx);
		const docs = await modelUser.getAll();
		return ctx.renderView("patientForm", {
			title: "Patient Form",
			doc: docs.doc,
		});
	},
	getAllPatient: async (ctx) => {
		const modelUser = require("../models/patientModel")(ctx);
		const docs = await modelUser.getAll();
		return ctx.ok({
			status: true,
			message: "success",
			data: docs.doc,
		});
	},
	getpatientData: async (ctx) => {
		try {
			console.log("reached");
			const data = ctx.request.body;
			const modelUser = require("../models/patientModel")(ctx);
			if (data.id) {
				var sanitizeData = sanitizer.sanitizetogetdataUpdate(data);
				if (sanitizeData.errors.length == 0) {
					const result = await modelUser.patientdataUpdate(data, data.id);
				} else {
					return {msg: " error"};
				}
			} else {
				delete data.id;
				var sanitizeData = sanitizer.sanitizetogetInsert(data);
				console.log("sanitizeData.errors", sanitizeData.errors);
				if (sanitizeData.errors.length == 0) {
					const result = await modelUser.patientdataInsert(data);
				} else {
					return {msg: "error"};
				}
			}
			// ctx.redirect('/patientForm');
			ctx.ok({status: true, msg: "Form submitted"});
		} catch (err) {
			ctx.ok(err);
		}
	},
	deleteData: async (ctx) => {
		const modelUser = require("../models/patientModel")(ctx);
		const docs = await modelUser.getdataDelete(ctx.params.id);
		return ctx.redirect("/patientForm");
	},
	getdataupdate: async (ctx) => {
		const modelUser = require("../models/patientModel")(ctx);
		const result = await modelUser.getData(ctx.params.id);
		// const docs = await modelUser.getAll();
		return ctx.ok({
			status: true,
			message: "success",
			data: result.doc,
		});
		// return ctx.renderView("patientForm", {
		//     title: "Patient Form",
		//     doc: result.doc,
		// })
	},

};
