import Router from "koa-router";
import { userController } from "../controllers/usercontroller";
import { loginRequired } from "../middleware/authentication";

export const userRouter = new Router();

userRouter.post("/register", async ctx => {
	const result = await userController.userCreate(ctx.request.body);

	ctx.body = {
		success: true,
		result
	};
});

userRouter.post("/login", async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 400, "Object Required");

	let user = await userController.userLogin(object);

	ctx.body = {
		user
	};
});

userRouter.delete("/:id", loginRequired, async ctx => {
	let object = await userController.userFind(ctx.params.id);
	ctx.assert(object, 400, "Object Required");

	let user = await userController.userDelete(object.id);

	ctx.body = {
		user
	};
});
