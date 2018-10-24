import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import { Context } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { userRouter } from "./routes/userRoutes";
import { accountRouter } from "./routes/accountRoutes";
import { errorHandler } from "./middleware/errorHandling";
import { groupRouter } from "./routes/groupRoutes";

const app = new Koa();

app.use(
	bodyParser({
		enableTypes: ["json", "form"],
		formLimit: "10mb",
		jsonLimit: "10mb"
	})
);

// Sessions
const session = require("koa-session");
app.keys = ["secret"];
app.use(session({}, app));

const Auth0Strategy = require("passport-auth0");
const passport = require("koa-passport");

const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL: process.env.AUTH0_CALLBACK_URL,
		state: true
	},
	function(accessToken, refreshToken, extraParams, profile, done) {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile);
	}
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// x-response-time
app.use(async (ctx: Context, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set("X-Response-Time", `${ms}ms`);
});

// logger
app.use(async (ctx: Context, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(errorHandler);

const router = new Router();

// Add Routers
router.use("/user", userRouter.routes());
router.use("/account", accountRouter.routes());
router.use("/group", groupRouter.routes());

app.use(router.routes());
app.use((ctx: Context) => {
	ctx.status = 404;
	ctx.body = { error: "Route not found" };
});

require("./associations.js");

const port = process.env.PORT || 3000;
app.listen(port);
