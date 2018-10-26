import Router from "koa-router";
import { mediaController } from "../controllers/mediacontroller";
import { loginRequired } from "../middleware/authentication";

export const mediaRouter = new Router();

mediaRouter.post(
	"account/:accountId/group/:groupId",
	loginRequired,
	async ctx => {
		const result = await mediaController.mediaCreate(
			ctx.params.accountId,
			ctx.params.groupId,
			ctx.request.body
		);

		ctx.assert(result, 404, "Object Required");

		ctx.body = {
			success: true,
			result
		};
	}
);
