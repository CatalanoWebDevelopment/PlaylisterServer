import Router from "koa-router";
import { loginRequired } from "../middleware/authentication";
import { scheduleController } from "../controllers/schedulecontroller";

export const scheduleRouter = new Router();

scheduleRouter.post(
	"/group/:groupId/playlist/:playlistId",
	loginRequired,
	async ctx => {
		const result = await scheduleController.scheduleCreate(
			ctx.state.accountId,
			ctx.params.groupId,
			ctx.params.playlistId,
			ctx.request.body
		);

		ctx.assert(result, 404, "Object Required");

		ctx.body = {
			success: true,
			result
		};
	}
);

scheduleRouter.delete("/:id", loginRequired, async ctx => {
	let object = await scheduleController.scheduleFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(object, 404, "Object Required");

	let schedule = await scheduleController.scheduleDelete(
		ctx.state.accountId,
		object.id
	);

	ctx.body = {
		schedule
	};
});

scheduleRouter.get("/:id", loginRequired, async ctx => {
	let schedule = await scheduleController.scheduleFind(
		ctx.state.accountId,
		ctx.params.id
	);
	ctx.assert(schedule, 404, "Object Required");

	ctx.body = {
		schedule
	};
});

scheduleRouter.get("/all/:id", loginRequired, async ctx => {
	let schedule = await scheduleController.scheduleFindAll(ctx.params.id);
	ctx.assert(schedule, 404, "Object Required");

	ctx.body = {
		schedule
	};
});

scheduleRouter.put("/:id", loginRequired, async ctx => {
	let object = ctx.request.body;
	ctx.assert(object, 404, "Object Required");

	let original: any = await scheduleController.scheduleFind(
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

scheduleRouter.get("/master/playlist/:playlistId", loginRequired, async ctx => {
	let schedules = await scheduleController.scheduleMasterFetch(
		ctx.state.accountId,
		ctx.params.playlistId
	);

	ctx.body = {
		schedules
	};
});
