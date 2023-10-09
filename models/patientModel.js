const {log} = require("handlebars");
const {ObjectId} = require("mongodb");
module.exports = (ctx) => {
	return {
		patientdataInsert: async (data) => {
			try {
				data.phone = Number(data.phone);
				data.dob = new Date(data.dob);
				const result = await ctx.mongo.collection("patient").insertOne(data);
				if (result) {
					return {status: true, msg: "form submitted"};
				} else {
					return {status: false, msg: "fail to submit"};
				}
			} catch (err) {
				return {status: false, msg: "unexpected error"};
			}
		},
		getAll: async () => {
			try {
				const result = await ctx.mongo.collection("patient").find().toArray();
				if (result) {
					return {status: true, msg: "ok", doc: result};
				} else {
					return {status: false, msg: "not ok"};
				}
			} catch (err) {
				return {status: false, msg: "unexpected error"};
			}
		},
		getdataDelete: async (id) => {
			try {
				const result = await ctx.mongo.collection("patient").deleteOne({_id: new ObjectId(id)});
				if (result.deleteCount > 0) {
					return {status: true, msg: "data deleted sucessfully"};
				} else {
					return {status: false, msg: "fail to delete"};
				}
			} catch (err) {
				return {status: false, msg: "unexpected error"};
			}
		},
		getData: async (id)=>{
			try {
				const result=await ctx.mongo.collection("patient").findOne({_id: new ObjectId(id)});
				if (result) {
					return {status: true, msg: "ok", doc: result};
				} else {
					return {status: false, msg: "not ok"};
				}
			} catch (err) {
				return {status: false, msg: "unexpected error"};
			}
		},
		patientdataUpdate: async (data, id)=>{
			try {
				delete data.id;
				const result=await ctx.mongo.collection("patient").updateOne({_id: new ObjectId(id)}, {$set: data});
				if (result.updateCount>0) {
					return {status: true, msg: "data updated sucessfully"};
				} else {
					return {status: false, msg: "fail to update"};
				}
			} catch (err) {
				return {status: false, msg: "unexpected error"};
			}
		},

	};
};
