import { BaseDoc } from "../associations";

export interface ScheduleDoc extends BaseDoc {
	name: string;
	date: Date;
	accountId: number;
	groupId: number;
	playlistId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("schedule", {
		name: DataTypes.STRING,
		date: DataTypes.DATE
	});
}
