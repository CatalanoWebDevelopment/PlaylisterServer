const Group = require("../db").import("../models/group");

class GroupService {
	async groupCreate(accountId, groupObj) {
		const createdGroup = await Group.create({
			accountId: accountId,
			name: groupObj.name
		});

		return createdGroup;
	}
}

export const groupController = new GroupService();
