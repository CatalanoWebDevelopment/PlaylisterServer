import { BaseDoc } from "../associations";

export interface UserDoc extends BaseDoc {
	email: string;
	name: string;
	password: string;
	accountId: number;
}

export default function(sequelize, DataTypes) {
	return sequelize.define("user", {
		email: DataTypes.STRING,
		name: DataTypes.STRING,
		password: DataTypes.STRING
	});
}
