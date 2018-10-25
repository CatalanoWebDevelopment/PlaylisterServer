import { BaseDoc } from "../associations";

export enum NextAction {
	Play = "play",
	Pause = "pause",
	Next = "next",
	Loop = "loop"
}

export interface PlayListItemDoc extends BaseDoc {
	mediaId: number;
	playlistId: number;
	nextAction: NextAction;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("playlistItem", {
		nextAction: {
			type: DataTypes.ENUM,
			values: ["play", "pause", "next", "loop"]
		}
	});
}
