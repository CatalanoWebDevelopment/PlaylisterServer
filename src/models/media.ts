import { BaseDoc } from "../associations";

export interface MediaDoc extends BaseDoc {
	name: string;
	url: string;
	thumbUrl: string;
	available: boolean;
	size: number;
	length: number;
	accountId: number;
	groupId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("media", {
		name: DataTypes.STRING,
		url: DataTypes.STRING,
		thumbUrl: DataTypes.STRING,
		available: DataTypes.BOOLEAN,
		size: DataTypes.NUMBER,
		length: DataTypes.INTEGER
	});
}
