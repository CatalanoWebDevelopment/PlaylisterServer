import { BaseDoc } from "../associations";

export interface AccountDoc extends BaseDoc {
	name: string;
	password: string;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("account", {
		name: DataTypes.STRING,
		password: DataTypes.STRING
	});
}
