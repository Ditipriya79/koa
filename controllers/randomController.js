module.exports = {
	randomNumber: (ctx) => {
		const num = Math.floor(Math.random()*9000) + 1000;
		return ctx.ok({status: true, msg: "OK", number: num});
	},
	testMultipart: (ctx) => {
		// console.log(ctx.request.files)
		// console.log(ctx.request.body)
		return ctx.redirect("/");
	},
};
