import { sequelize } from "../db";

const Group = sequelize.import("../models/group");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class GroupService {
	async groupCreate(accountId, groupObj) {
		try {
			const createdGroup = await Group.create({
				accountId,
				name: groupObj.name
			});

			return createdGroup;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async groupFind(accountId, groupId) {
		const foundGroup = await Group.findOne({
			where: { accountId, id: groupId }
		});

		if (!foundGroup) {
			const e: ErrorWithStatus = new Error("group Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundGroup;
	}

	async groupFindAll(accountId) {
		const foundGroups = await Group.findAll({
			where: { accountId: accountId }
		});

		if (!foundGroups) {
			const e: ErrorWithStatus = new Error("No groups Within Account");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundGroups;
	}

	async groupDelete(accountId, groupId) {
		const foundGroup = await Group.findOne({
			where: { accountId, id: groupId }
		});

		if (!foundGroup) {
			const e: ErrorWithStatus = new Error("group Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await Group.destroy({
				where: { id: groupId }
			});

			return { success: true };
		}
	}

	async groupUpdate(accountId, groupId, groupObj) {
		const updatedGroup = await Group.update(
			{ groupObj },
			{ where: { accountId, id: groupId } }
		);

		return updatedGroup;
	}
}

export const groupController = new GroupService();
