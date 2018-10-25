export enum NextAction {
	play = "play",
	pause = "pause",
	next = "next",
	loop = "loop"
}

export interface PlayListItemDoc {
	next_action: NextAction;
}

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("playlist_item", {
		next_action: DataTypes.ENUM,
		values: ["play", "pause", "next", "loop"]
	});
};
