import Router from "koa-router";
import { userController } from "../controllers/usercontroller";

export const userRouter = new Router();

userRouter.post("/login", async ctx => {
	const result = await userController.userLogin(ctx.request.body);

	ctx.body = {
		success: true,
		result
	};
});

userRouter.post("/register", async ctx => {
	const result = await userController.userCreate(ctx.request.body);

	ctx.body = {
		success: true,
		result
	};
});

userRouter.delete("/:id", async ctx => {
	const result = await userController.userDelete(ctx.params.id);

	ctx.body = {
		result
	};
});
