import Router from "koa-router";
import { groupController } from "../controllers/groupcontroller";
import { loginRequired } from "../middleware/authentication";

export const groupRouter = new Router();

groupRouter.post("/account/:accountId", loginRequired, async ctx => {
	const result = await groupController.groupCreate(
		ctx.params.accountId,
		ctx.request.body
	);

	ctx.assert(result, 404, "Object Required");

	ctx.body = {
		result
	};
});

groupRouter.delete("/:id", loginRequired, async ctx => {
	let object = await groupController.groupFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(object, 404, "Object Required");

	let group = await groupController.groupDelete(ctx.state.accountId, object.id);

	ctx.body = {
		group
	};
});

groupRouter.get("/:id", loginRequired, async ctx => {
	let group = await groupController.groupFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(group, 404, "Object Required");

	ctx.body = {
		group
	};
});

groupRouter.get("/all/:id", loginRequired, async ctx => {
	let group = await groupController.groupFindAll(ctx.params.id);
	ctx.assert(group, 404, "Object Required");

	ctx.body = {
		group
	};
});

groupRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await groupController.groupFind(
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
