import Router from "koa-router";
import { groupController } from "../controllers/groupcontroller";

export const groupRouter = new Router();

groupRouter.post("/:accountId", async ctx => {
	const result = await groupController.groupCreate(
		ctx.params.accountId,
		ctx.request.body
	);

	ctx.body = {
		result
	};
});
