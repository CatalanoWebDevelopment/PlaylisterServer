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
import { mediaRouter } from "./routes/mediaRoutes";
import { playlistRouter } from "./routes/playlistRoutes";
import { playlistItemRouter } from "./routes/playlistItemRoutes";

const app = new Koa();

app.use(
	bodyParser({
		enableTypes: ["json", "form"],
		formLimit: "10mb",
		jsonLimit: "10mb"
	})
);

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
router.use("/media", mediaRouter.routes());
router.use("/playlist", playlistRouter.routes());
router.use("/playlistItem", playlistItemRouter.routes());

app.use(router.routes());
app.use((ctx: Context) => {
	ctx.status = 404;
	ctx.body = { error: "Route not found" };
});

require("./associations.js");

const port = process.env.PORT || 3000;
app.listen(port);
