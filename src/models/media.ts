import { BaseDoc } from "../associations";

export enum MediaType {
	Image = "image",
	Video = "video"
}

export interface MediaDoc extends BaseDoc {
	name: string;
	url: string;
	type: MediaType;
	thumbUrl: string;
	available: boolean;
	size: number;
	clipLength: number;
	accountId: number;
	groupId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("media", {
		name: DataTypes.STRING,
		url: DataTypes.STRING,
		thumbUrl: DataTypes.STRING,
		available: DataTypes.BOOLEAN,
		size: DataTypes.INTEGER,
		clipLength: DataTypes.INTEGER,
		type: {
			type: DataTypes.ENUM,
			values: ["image", "video"]
		}
	});
}
