import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { screenController } from "../controllers/screencontroller";

export const screenRouter = new Router();

screenRouter.post("/group/:groupId", loginRequired, async ctx => {
	const result = await screenController.screenCreate(
		ctx.state.accountId,
		ctx.params.groupId,
		ctx.request.body
	);

	ctx.assert(result, 404, "Object Required");

	ctx.body = {
		success: true,
		result
	};
});

screenRouter.delete("/:id", loginRequired, async ctx => {
	let object = await screenController.screenFind(
		ctx.state.accountId,
		ctx.params.id
	);

	ctx.assert(object, 404, "Object Required");

	let screen = await screenController.screenDelete(
		ctx.state.accountId,
		object.id
	);

	ctx.body = {
		screen
	};
});

screenRouter.get("/:id", loginRequired, async ctx => {
	let screen = await screenController.screenFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(screen, 404, "Object Required");

	ctx.body = {
		screen
	};
});

screenRouter.get("/all/:id", loginRequired, async ctx => {
	let screen = await screenController.screenFindAll(ctx.params.id);
	ctx.assert(screen, 404, "Object Required");

	ctx.body = {
		screen
	};
});

screenRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await screenController.screenFind(
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

screenRouter.get("/master/group/:groupId", loginRequired, async ctx => {
	let screens = await screenController.screenMasterFetch(
		ctx.state.accountId,
		ctx.params.groupId
	);

	ctx.body = {
		screens
	};
});
