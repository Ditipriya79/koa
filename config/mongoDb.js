
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectId;

module.exports = async function(app) {
	try {
		const client = new MongoClient((process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017"), {minPoolSize: 5, compressors: ["zstd"]});
		await client.connect();
		const db = client.db(process.env.DB_NAME || "koa-starter-app");
		app.context.mongo = db;
		app.context.ObjectId = ObjectID;
	} catch (err) {
		console.log(err);
		// throw new Error(500);
	}
};
