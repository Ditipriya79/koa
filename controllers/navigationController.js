module.exports = {
	petManagement: async (ctx) => {
		ctx.set("Cache-Control", "no-cache, no-store, must-revalidate");

		const model = require("../models/pet")(ctx);
		const result = await model.list({});
		if (!result.status) {
			throw {};
		}
		return ctx.renderView("petManagement", {
			title: icplApp.appDisplayName + " | Pet Management",
			scriptPath: "/prod/js/views/petManagement.js?ver=1",
			// scriptPath: "/js/views/petManagement.js?ver=1.1",
			pets: result.docs,
		});
	},
};
