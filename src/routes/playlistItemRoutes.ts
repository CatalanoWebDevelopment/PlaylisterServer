import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { playlistItemController } from "../controllers/playlistitemcontroller";

export const playlistItemRouter = new Router();

playlistItemRouter.post(
	"/playlist/:playlistId/media/:mediaId",
	loginRequired,
	async ctx => {
		const result = await playlistItemController.playlistItemCreate(
			ctx.state.accountId,
			ctx.params.playlistId,
			ctx.params.mediaId,
			ctx.request.body
		);

		ctx.assert(result, 404, "Object Required");

		ctx.body = {
			success: true,
			result
		};
	}
);

playlistItemRouter.delete("/:id", loginRequired, async ctx => {
	let object = await playlistItemController.playlistItemFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(object, 404, "Object Required");

	let playlistItem = await playlistItemController.playlistItemDelete(
		ctx.state.accountId,
		object.id
	);

	ctx.body = {
		playlistItem
	};
});

playlistItemRouter.get("/:id", loginRequired, async ctx => {
	let playlistItem = await playlistItemController.playlistItemFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(playlistItem, 404, "Object Required");

	ctx.body = {
		playlistItem
	};
});

playlistItemRouter.get("/all/:id", loginRequired, async ctx => {
	let playlistItem = await playlistItemController.playlistItemFindAll(
		ctx.params.id
	);
	ctx.assert(playlistItem, 404, "Object Required");

	ctx.body = {
		playlistItem
	};
});

playlistItemRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await playlistItemController.playlistItemFind(
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

playlistItemRouter.get(
	"/master/playlist/:playlistId",
	loginRequired,
	async ctx => {
		let playlistItems = await playlistItemController.playlistItemMasterFetch(
			ctx.state.accountId,
			ctx.params.playlistId
		);

		ctx.body = {
			playlistItems
		};
	}
);
