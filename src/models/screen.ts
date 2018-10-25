import { BaseDoc } from "../associations";

export interface ScreenDoc extends BaseDoc {
	name: string;
	accountId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("screen", {
		name: DataTypes.STRING
	});
}
