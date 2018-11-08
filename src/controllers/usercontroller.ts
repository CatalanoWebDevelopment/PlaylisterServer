import { sequelize } from "../db";

const User = sequelize.import("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class UserService {
	_createToken(user) {
		return jwt.sign(
			{ email: user.email, userId: user.id, accountId: user.accountId },
			process.env.JWT_SECRET,
			{
				expiresIn: "24h"
			}
		);
	}

	async userCreate(userObj) {
		try {
			const createdUser = await User.create({
				name: userObj.name,
				email: userObj.email,
				password: bcrypt.hashSync(userObj.password, 10),
				accountId: userObj.accountId
			});
			return {
				createdUser,
				token: this._createToken(createdUser)
			};
		} catch (e) {
			return {
				error: true,
				e: e.errors[0].message
			};
		}
	}

	async userLogin(userObj) {
		try {
			const loggedInUser = await User.findOne({
				where: { email: userObj.email }
			});
			const isUser = await bcrypt.compare(
				userObj.password,
				loggedInUser.password
			);
			if (isUser) {
				return {
					loggedInUser,
					error: false,
					token: this._createToken(loggedInUser)
				};
			} else {
				return {
					error: true,
					errorMsg: "Wrong username or password"
				};
			}
		} catch (e) {
			return {
				error: true,
				errorMsg: "User doesn't exist"
			};
		}
	}

	async userDelete(userId) {
		const foundUser = await User.findOne({
			where: { id: userId }
		});

		if (!foundUser) {
			const e: ErrorWithStatus = new Error("User Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		} else {
			await User.destroy({
				where: { id: userId }
			});

			return { success: true };
		}
	}

	async userFind(userId) {
		const foundUser = await User.findOne({
			where: { id: userId }
		});

		if (!foundUser) {
			const e: ErrorWithStatus = new Error("User Not Found");
			e.status = 404;
			return `${e.message}, Status: ${e.status}`;
		}

		return foundUser;
	}

	async userFindAll(accountId) {
		const foundUsers = await User.findAll({
			where: { accountId }
		});

		if (!foundUsers) {
			const e: ErrorWithStatus = new Error("No Users Within Account");
			e.status = 404;
			throw `${e.message}, Status: ${e.status}`;
		}

		return foundUsers;
	}

	async userUpdate(userId, userObj) {
		const updatedUser = await User.update(
			{ userObj },
			{ where: { id: userId } }
		);

		return updatedUser;
	}
}

export const userController = new UserService();
