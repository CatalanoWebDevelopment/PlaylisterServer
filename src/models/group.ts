import { BaseDoc } from "../associations";

export interface GroupDoc extends BaseDoc {
	name: string;
	accountId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("group", {
		name: DataTypes.STRING
	});
}
