import { sequelize } from "../db";
const Schedule = sequelize.import("../models/schedule");

interface ErrorWithStatus extends Error {
	status?: number;
}

class ScheduleService {
	async scheduleCreate(accountId, groupId, playlistId, scheduleObj) {
		try {
			const createdSchedule = await Schedule.create({
				accountId,
				groupId,
				playlistId,
				name: scheduleObj.name,
				date: scheduleObj.date
			});

			return createdSchedule;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async scheduleFind(accountId, id) {
		const foundSchedule = await Schedule.findOne({
			where: { accountId, id }
		});

		if (!foundSchedule) {
			const e: ErrorWithStatus = new Error("Schedule Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundSchedule;
	}

	async scheduleFindAll(accountId) {
		const foundSchedules = await Schedule.findAll({
			where: { accountId }
		});

		if (!foundSchedules) {
			const e: ErrorWithStatus = new Error("Schedule Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundSchedules;
	}

	async scheduleDelete(accountId, id) {
		const foundSchedule = await Schedule.findOne({
			where: { accountId, id }
		});

		if (!foundSchedule) {
			const e: ErrorWithStatus = new Error("Schedule Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await Schedule.destroy(foundSchedule);
			return { success: true };
		}
	}

	async scheduleUpdate(accountId, id, scheduleObj) {
		const updatedSchedule = await Schedule.update(
			{ scheduleObj },
			{ where: { accountId, id } }
		);

		return updatedSchedule;
	}

	async scheduleMasterFetch(accountId, playlistId) {
		const fetchedSchedules = await Schedule.findAll({
			where: { accountId, playlistId },
			include: ["playlist", "group"]
		});

		return fetchedSchedules;
	}
}

export const scheduleController = new ScheduleService();
