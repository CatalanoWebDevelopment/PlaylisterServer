import { sequelize } from "../db";

const Media = sequelize.import("../models/media");

class MediaService {
	async mediaCreate(accountId, groupId, mediaObj) {
		const createdMedia = await Media.create({
			account_id: accountId,
			group_id: groupId,
			name: mediaObj.name,
			url: mediaObj.url,
			thumb_url: mediaObj.thumb_url,
			available: mediaObj.available,
			size: mediaObj.size,
			length: mediaObj.length
		});

		return createdMedia;
	}
}

export const mediaController = new MediaService();
