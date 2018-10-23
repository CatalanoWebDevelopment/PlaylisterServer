import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import { Context } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
app.use(
	bodyParser({
		enableTypes: ["json", "form"],
		formLimit: "10mb",
		jsonLimit: "10mb"
	})
);

// Add Controllers
const AccountController = require("../controllers/accountcontroller");
const MediaController = require("../controllers/mediacontroller");
const PlaylistController = require("../controllers/playlistcontroller");
const PlaylistItemController = require("../controllers/playlistitemcontroller");
const ScheduleController = require("../controllers/schedulecontroller");
const ScreenController = require("../controllers/screencontroller");
const UserController = require("../controllers/usercontroller");

// Require Headers
app.use(require("../middleware/headers"));

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

app.use(async (ctx: Context, next: Function) => {
	try {
		await next();
	} catch (error) {
		ctx.status = error.status || 503;
		ctx.body = { error: error.message };
	}
});

const router = new Router();

// Add routes here
router.use("/user", UserController);
router.use(require("../middleware/validate-session"));
router.use("/account", AccountController);
router.use("/media", MediaController);
router.use("/playlist", PlaylistController);
router.use("/playlist-item", PlaylistItemController);
router.use("/schedule", ScheduleController);
router.use("/screen", ScreenController);

app.use(router.routes());
app.use((ctx: Context) => {
	ctx.status = 404;
	ctx.body = { error: "Route not found" };
});

require("../associations.js");

const port = process.env.PORT || 3000;
app.listen(port);
