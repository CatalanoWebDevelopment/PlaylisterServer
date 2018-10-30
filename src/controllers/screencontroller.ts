import { sequelize } from "../db";
const Screen = sequelize.import("../models/screen");

interface ErrorWithStatus extends Error {
	status?: number;
}

class ScreenService {
	async screenCreate(accountId, groupId, screenObj) {
		try {
			const createdScreen = await Screen.create({
				accountId,
				groupId,
				name: screenObj.name
			});

			return createdScreen;
		} catch (e) {
			return {
				error: true,
				e: e.error[0].message
			};
		}
	}

	async screenFind(accountId, id) {
		const foundScreen = await Screen.findOne({
			where: { accountId, id }
		});

		if (!foundScreen) {
			const e: ErrorWithStatus = new Error("screen Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundScreen;
	}

	async screenFindAll(accountId) {
		const foundScreen = await Screen.findAll({
			where: { accountId }
		});

		if (!foundScreen) {
			const e: ErrorWithStatus = new Error("No Screens Within Account");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundScreen;
	}

	async screenDelete(accountId, ScreenId) {
		const foundScreen = await Screen.findOne({
			where: { accountId, id: ScreenId }
		});

		if (!foundScreen) {
			const e: ErrorWithStatus = new Error("Screen Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await Screen.destroy({
				where: { id: ScreenId }
			});

			return { success: true };
		}
	}

	async screenUpdate(accountId, screenId, screenObj) {
		const updatedScreen = await Screen.update(
			{ screenObj },
			{ where: { accountId, id: screenId } }
		);

		return updatedScreen;
	}

	async screenMasterFetch(accountId, groupId) {
		const fetchedScreens = await Screen.findAll({
			where: { accountId, groupId },
			include: ["group"]
		});

		return fetchedScreens;
	}
}

export const screenController = new ScreenService();
