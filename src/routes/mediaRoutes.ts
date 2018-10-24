import Router from "koa-router";
import { mediaController } from "../controllers/mediacontroller";

export const mediaRouter = new Router();

mediaRouter.post("/:accountId/:groupId", async ctx => {
	const result = await mediaController.mediaCreate(
		ctx.params.accountId,
		ctx.params.groupId,
		ctx.request.body
	);

	ctx.body = {
		success: true,
		result
	};
});
