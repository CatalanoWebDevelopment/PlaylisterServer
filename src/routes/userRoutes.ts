import Router from "koa-router";
import { userController } from "../controllers/usercontroller";

// Authentication
const Auth0Strategy = require("passport-auth0"),
	passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn();

export const userRouter = new Router();

userRouter.post("/register", async ctx => {
	const result = await userController.userCreate(ctx.request.body);

	ctx.body = {
		success: true,
		result
	};
});

// userRouter.delete("/:id", async ctx => {
// 	const result = await userController.userDelete(ctx.params.id);

// 	ctx.body = {
// 		result
// 	};
// });

userRouter.get(
	"/login",
	passport.authenticate("auth0", { scope: "openid email profile" }),
	async ctx => {
		ctx.redirect("/");
	}
);

userRouter.get(
	"/callback",
	passport.authenticate("auth0", { failureRedirect: "/login" }),
	async ctx => {
		if (!ctx.request.body) {
			throw new Error("User Null");
		}
		ctx.redirect("/username");
	}
);

userRouter.get("/username", ensureLoggedIn, async ctx => {
	const result = await userController.userLogin(ctx.body.email);

	ctx.body = {
		result
	};
});
