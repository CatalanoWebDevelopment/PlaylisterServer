import { sequelize } from "../db";
import playlist from "../models/playlist";
import media from "../models/media";
const PlaylistItem = sequelize.import("../models/playlistItem");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class PlaylistItemService {
	async playlistItemCreate(accountId, playlistId, mediaId, playlistItemObj) {
		try {
			const createdPlaylistItem = await PlaylistItem.create({
				accountId: accountId,
				playlistId: playlistId,
				mediaId: mediaId,
				nextAction: playlistItemObj.nextAction
			});

			return createdPlaylistItem;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async playlistItemFind(accountId, playlistItemId) {
		const foundPlaylistItem = await PlaylistItem.findOne({
			where: { accountId, id: playlistItemId }
		});

		if (!foundPlaylistItem) {
			const e: ErrorWithStatus = new Error("playlistItem Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundPlaylistItem;
	}

	async playlistItemFindAll(accountId) {
		const foundPlaylistItem = await PlaylistItem.findAll({
			where: { accountId }
		});

		if (!foundPlaylistItem) {
			const e: ErrorWithStatus = new Error("No PlaylistItems Within Account");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundPlaylistItem;
	}

	async playlistItemDelete(accountId, playlistItemId) {
		const foundPlaylistItem = await PlaylistItem.findOne({
			where: { accountId, id: playlistItemId }
		});

		if (!foundPlaylistItem) {
			const e: ErrorWithStatus = new Error("PlaylistItem Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await PlaylistItem.destroy({
				where: { id: playlistItemId }
			});

			return { success: true };
		}
	}

	async playlistItemUpdate(accountId, playlistItemId, playlistItemObj) {
		const updatedPlaylistItem = await PlaylistItem.update(
			{ playlistItemObj },
			{ where: { accountId, id: playlistItemId } }
		);

		return updatedPlaylistItem;
	}

	async playlistItemMasterFetch(accountId, playlistId) {
		const fetchedPlaylistItems = await PlaylistItem.findAll({
			where: { accountId, playlistId },
			include: [
				{
					model: playlist,
					through: {
						attributes: ["playlistId"],
						where: { playlistId, accountId }
					}
				}
			]
		});

		return fetchedPlaylistItems;
	}
}

export const playlistItemController = new PlaylistItemService();
