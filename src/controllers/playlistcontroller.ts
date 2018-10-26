import { sequelize } from "../db";
const Playlist = sequelize.import("../models/playlist");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class PlaylistService {
	async playlistCreate(accountId, groupId, playlistObj) {
		try {
			const createdPlaylist = await Playlist.create({
				accountId: accountId,
				groupId: groupId,
				name: playlistObj.name
			});

			return createdPlaylist;
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async playlistFind(accountId, playlistId) {
		const foundPlaylist = await Playlist.findOne({
			where: { accountId, id: playlistId }
		});

		if (!foundPlaylist) {
			const e: ErrorWithStatus = new Error("playlist Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundPlaylist;
	}

	async playlistFindAll(accountId) {
		const foundPlaylist = await Playlist.findAll({
			where: { accountId: accountId }
		});

		if (!foundPlaylist) {
			const e: ErrorWithStatus = new Error("No playlists Within Account");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundPlaylist;
	}

	async playlistDelete(accountId, playlistId) {
		const foundPlaylist = await Playlist.findOne({
			where: { accountId, id: playlistId }
		});

		if (!foundPlaylist) {
			const e: ErrorWithStatus = new Error("playlist Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await Playlist.destroy({
				where: { id: playlistId }
			});

			return { success: true };
		}
	}

	async playlistUpdate(accountId, playlistId, playlistObj) {
		const updatedPlaylist = await Playlist.update(
			{ playlistObj },
			{ where: { accountId, id: playlistId } }
		);

		return updatedPlaylist;
	}
}

export const playlistController = new PlaylistService();
