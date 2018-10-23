import Router from "koa-router";
import { accountController } from "../controllers/accountcontroller";

export const accountRouter = new Router();

accountRouter.post("/register", async ctx => {
	const result = await accountController.accountCreate(ctx.request.body);

	ctx.body = {
		success: true,
		result
	};
});

accountRouter.delete("/:id", async ctx => {
	let result = await accountController.accountDelete(ctx.params.id);

	ctx.body = {
		result
	};
});

accountRouter.get("/:id", async ctx => {
	let result = await accountController.accountFind(ctx.params.id);

	ctx.body = {
		result
	};
});

accountRouter.put("/:id", async ctx => {
	let result = await accountController.accountUpdate(ctx.params.id);

	ctx.body = {
		result
	};
});
