var Validator = require("jsonschema").Validator;
var v = new Validator();

module.exports = {
	sanitizetogetInsert: (value) => {
		var baseSchema = {
			type: "object",
			properties: {
				fname: {type: "string", maxLength: 255, required: true},
				lname: {type: "string", maxlength: 255, required: true},
				email: {type: "email", maxLength: 255, required: true},
				phone: {type: "string", maxlength: 255, required: true},
				dob: {type: "string", maxLength: 255},
			},
			additionalProperties: false,
		};
		return v.validate(value, baseSchema);
	},
	sanitizetogetdataUpdate: (value) => {
		var baseSchema = {
			type: "object",
			properties: {
				id: {type: "string", maxLength: 128, required: true},
				fname: {type: "string", maxLength: 255, required: true},
				lname: {type: "string", maxlength: 255, required: true},
				email: {type: "email", maxLength: 255, required: true},
				phone: {type: "string", maxlength: 255, required: true},
				dob: {type: "string", maxLength: 255},
			},

			additionalProperties: false,
		};
		return v.validate(value, baseSchema);
	},
};
