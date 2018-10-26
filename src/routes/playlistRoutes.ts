import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { playlistController } from "../controllers/playlistcontroller";

export const playlistRouter = new Router();

playlistRouter.post("/group/:groupId", loginRequired, async ctx => {
	ctx.assert(ctx.state.accountId, 404, "Object Required");

	const result = await playlistController.playlistCreate(
		ctx.state.accountId,
		ctx.params.groupId,
		ctx.request.body
	);

	ctx.body = {
		success: true,
		result
	};
});

playlistRouter.delete("/:id", loginRequired, async ctx => {
	let object = await playlistController.playlistFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(object, 404, "Object Required");

	let playlist = await playlistController.playlistDelete(
		ctx.state.accountId,
		object.id
	);

	ctx.body = {
		playlist
	};
});

playlistRouter.get("/:id", loginRequired, async ctx => {
	let playlist = await playlistController.playlistFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(playlist, 404, "Object Required");

	ctx.body = {
		playlist
	};
});

playlistRouter.get("/all/:id", loginRequired, async ctx => {
	let playlist = await playlistController.playlistFindAll(ctx.params.id);
	ctx.assert(playlist, 404, "Object Required");

	ctx.body = {
		playlist
	};
});

playlistRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await playlistController.playlistFind(
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
