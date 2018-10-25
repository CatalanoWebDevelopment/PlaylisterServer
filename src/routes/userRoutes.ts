import Router from "koa-router";
import { userController } from "../controllers/usercontroller";

export const userRouter = new Router();

userRouter.post("/register", async ctx => {
	const result = await userController.userCreate(ctx.request.body);

	ctx.body = {
		success: true,
		result
	};
});
