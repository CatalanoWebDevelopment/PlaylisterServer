const User = require("../db").import("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
	_createToken(user) {
		return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
			expiresIn: "24h"
		});
	}

	async userCreate(userObj) {
		try {
			const createdUser = await User.create({
				name: userObj.name,
				email: userObj.email,
				password: bcrypt.hashSync(userObj.password, 10)
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
}

export const userController = new UserService();
