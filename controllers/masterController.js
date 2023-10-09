function petValidator(input, validateExisting) {
	if (!validateExisting && (!(input.name && input.petType))) {
		return {status: false, msg: "Parameter(s) missing."};
	}
	if (input.name) {
		if ((input.name.length < 2) || (input.name.length > 80)) {
			return {status: false, msg: "Invalid value for 'Name'."};
		}
		input.name = input.name.toUpperCase();
	}
	const _ = require("lodash");
	input = _.omitBy(input, _.isNil);
	return {status: true, msg: "", data: input};
}
module.exports = {

	createPet: async (ctx) => {
		const nameVal = ctx.request.body.name;
		const petTypeVal = ctx.request.body.petType;
		// console.log(ctx.request.headers)
		const now = new Date();
		const input = {
			name: nameVal,
			petType: petTypeVal,
		};
		input.isActive = true;
		input.createdAt = now;
		input.updatedAt = now;

		const validationResult = petValidator(input);
		if (!validationResult.status) {
			return ctx.ok(validationResult);
		}
		const model = require("../models/pet")(ctx);
		const result = await model.create(validationResult.data);
		return ctx.ok({status: true, msg: "OK", doc: result.doc});
	},
	updatePet: async (ctx) => {
		if (!(ctx.request.body.find && ctx.request.body.update)) {
			return ctx.ok({status: false, msg: "Parameter(s) missing."});
		}
		const petId = ctx.request.body.find;
		const nameVal = ctx.request.body.update.name;
		const petTypeVal = ctx.request.body.update.petType;
		const isActiveVal = ctx.request.body.update.isActive;
		// console.log(ctx.request.query)

		const now = new Date();
		let input = {
			name: nameVal,
			petType: petTypeVal,
			isActive: isActiveVal,
		};

		const validationResult = petValidator(input, true);
		if (!validationResult.status) {
			return ctx.ok(validationResult);
		}
		input = validationResult.data;
		input.updatedAt = now;
		const model = require("../models/pet")(ctx);
		const result = await model.update(petId, input);
		return ctx.ok(result);
	},
};
