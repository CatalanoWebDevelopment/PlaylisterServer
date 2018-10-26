import Router from "koa-router";
import { mediaController } from "../controllers/mediacontroller";
import { loginRequired } from "../middleware/authentication";

export const mediaRouter = new Router();

mediaRouter.post(
	"account/:accountId/group/:groupId",
	loginRequired,
	async ctx => {
		const result = await mediaController.mediaCreate(
			ctx.state.accountId,
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

mediaRouter.delete("/:id", loginRequired, async ctx => {
	let object = await mediaController.mediaFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(object, 404, "Object Required");

	let media = await mediaController.mediaDelete(ctx.state.accountId, object.id);

	ctx.body = {
		media
	};
});

mediaRouter.get("/:id", loginRequired, async ctx => {
	let media = await mediaController.mediaFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(media, 404, "Object Required");

	ctx.body = {
		media
	};
});

mediaRouter.get("/all/:id", loginRequired, async ctx => {
	let media = await mediaController.mediaFindAll(ctx.params.id);
	ctx.assert(media, 404, "Object Required");

	ctx.body = {
		media
	};
});

mediaRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await mediaController.mediaFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(original, 404, "Object Required");

	let updated: any = await original.update(ctx.request.body);

	ctx.body = {
		success: true,
		updated
	};
});
