import { sequelize } from "../db";
const Media = sequelize.import("../models/media");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class MediaService {
	async mediaCreate(accountId, groupId, mediaObj) {
		try {
			const createdMedia = await Media.create({
				accountId: accountId,
				groupId: groupId,
				name: mediaObj.name,
				url: mediaObj.url,
				thumbUrl: mediaObj.thumbUrl,
				available: mediaObj.available,
				size: mediaObj.size,
				clipLength: mediaObj.clipLength
			});

			return createdMedia;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async mediaFind(accountId, mediaId) {
		const foundMedia = await Media.findOne({
			where: { accountId, id: mediaId }
		});

		if (!foundMedia) {
			const e: ErrorWithStatus = new Error("Media Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundMedia;
	}

	async mediaFindAll(accountId) {
		const foundMedia = await Media.findAll({
			where: { accountId: accountId }
		});

		if (!foundMedia) {
			const e: ErrorWithStatus = new Error("No Medias Within Account");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundMedia;
	}

	async mediaDelete(accountId, mediaId) {
		const foundMedia = await Media.findOne({
			where: { accountId, id: mediaId }
		});

		if (!foundMedia) {
			const e: ErrorWithStatus = new Error("Media Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await Media.destroy({
				where: { id: mediaId }
			});

			return { success: true };
		}
	}

	async mediaUpdate(accountId, mediaId, mediaObj) {
		const updatedMedia = await Media.update(
			{ mediaObj },
			{ where: { accountId, id: mediaId } }
		);

		return updatedMedia;
	}
}

export const mediaController = new MediaService();
