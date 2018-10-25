import { BaseDoc } from "../associations";

export interface PlaylistDoc extends BaseDoc {
	name: string;
	accountId: number;
	groupId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("playlist", {
		name: DataTypes.STRING
	});
}
