/* eslint no-unreachable: 0 */
/* eslint no-console: 0 */

const Koa = require("koa");
const Router = require("koa-router");
const Cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const Helmet = require("koa-helmet");
const respond = require("koa-respond");
const serve = require("koa-static");
const views = require("koa-views");
const session = require("koa-session");
const conditional = require("koa-conditional-get");
const etag = require("koa-etag");
const formidable = require("koa2-formidable");


const app = new Koa();

app.use(conditional());
app.use(etag());
app.use(serve("assets", {maxage: 1000 * 60 * 60 * 24 * 15}));
const router = new Router();

icplApp.appPath = __dirname;

app.context.secret = (process.env.APP_GUID || "17f3d248-23b8-11e8-b467-0ed5f89f718b");
app.keys = [app.context.secret];

const SESSION_CONFIG = {
	maxAge: icplApp.isClientMode?(8 * 60 * 60 * 1000):(30 * 60 * 1000),
};

app.use(session(SESSION_CONFIG, app));

const viewUtil = require("./config/view");

app.use(Helmet({
	contentSecurityPolicy: {
		useDefaults: true,
		directives: {
			scriptSrcAttr: "'unsafe-inline'",
			scriptSrc: ["'self'", "'nonce-2726c7f26c'"],
			// objectSrc: "'unsafe-inline'",
			// scriptSrcElem: "'unsafe-inline'",
		},
	},
}));

app.use(Cors());

app.use(respond());

app.use(views("views", {
	map: {
		hbs: "handlebars",
	},
	extension: "hbs",
	options: {
		partials: viewUtil.partials,
		helpers: viewUtil.helpers,
	},
}));

app.use(async function(ctx, next) {
	if (!ctx.renderView) {
		ctx.renderView = function(view, viewData) {
			if (!viewData) {
				viewData = {};
			}
			viewData["view"] = {path: view};
			viewData["session"] = ctx.session;
			viewData["icplApp"] = icplApp;
			return ctx.render(view, viewData);
		};
	}
	await next();
});

app.use(async function errorHandler(ctx, next) {
	try {
		await next();
		const status = ctx.status || 404;
		if (status === 404 || status === 403 || status === 500) {
			throw {status: status};
		} else if (status === 405) {
			throw {status: 403};
		}
	} catch (err) {
		if (err.status === 404) {
			ctx.status = err.status;
			switch (ctx.accepts("html", "json")) {
			case "html":
				return ctx.renderView("404");
				break;
			case "json":
				ctx.type = "json";
				ctx.body = {
					status: false,
					msg: "Not Found",
				};
				break;
			default:
				ctx.type = "text";
				ctx.body = "Page Not Found";
			}
		} else if (err.status === 403) {
			ctx.status = 403;
			var redirect = err.redirect;
			if (redirect) {
				return ctx.redirect(redirect);
			}
			switch (ctx.accepts("html", "json")) {
			case "html":
				return ctx.renderView("403");
				break;
			case "json":
				ctx.status = err.contextStatus || 403;
				ctx.type = "json";
				ctx.body = {
					status: false,
					msg: "You don't have permission",
				};
				break;
			default:
				ctx.type = "text";
				ctx.body = "You don't have permission";
			}
		} else {
			console.log(err);
			ctx.status = 500;
			switch (ctx.accepts("html", "json")) {
			case "html":
				return ctx.renderView("500");
				break;
			case "json":
				ctx.type = "json";
				ctx.body = {
					status: false,
					msg: "Internal Server Error",
				};
				break;
			default:
				ctx.type = "text";
				ctx.body = "Internal Server Error";
			}
		}
		return;
	}
});
const path = require("path");
app.use(formidable({
	uploadDir: path.join(__dirname, "uploads"),
	keepExtensions: true,
	multiples: true,
}));
app.use(bodyParser({
	formLimit: "5mb",
	jsonLimit: "5mb",
	xmlLimit: "5mb",
	onerror: function(err, ctx) {
		ctx.throw(422, "body parse error");
	},
}));

require("./config/mongoDb")(app);

const Policies = require("./config/policy");
app.use(Policies.policyHandler);

// API routes
require("./routes")(router);
app.use(router.routes());
app.use(router.allowedMethods());

require("./config/misc");

app.on("error", function() {
});


module.exports = app;
