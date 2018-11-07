import { sequelize } from "../db";

const Account = sequelize.import("../models/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class AccountService {
	_createToken(account) {
		return jwt.sign(
			{
				name: account.name,
				accountId: account.id
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h"
			}
		);
	}

	async accountCreate(accountObj) {
		const createdAccount = await Account.create({
			name: accountObj.name,
			password: bcrypt.hashSync(accountObj.password, 10)
		});

		return createdAccount;
	}

	async accountLogin(accountObj) {
		try {
			const loggedInAccount = await Account.findOne({
				where: { name: accountObj.name }
			});
			const isAccount = await bcrypt.compare(
				accountObj.password,
				loggedInAccount.password
			);
			if (isAccount) {
				return {
					loggedInAccount,
					error: false,
					token: this._createToken(loggedInAccount)
				};
			} else {
				return {
					error: true,
					errorMsg: "Wrong Account name or password"
				};
			}
		} catch (e) {
			return {
				error: true,
				errorMsg: "Account doesn't exist"
			};
		}
	}

	

	async accountDelete(accountId) {
		const foundAccount = await Account.findOne({
			where: { id: accountId }
		});

		if (!foundAccount) {
			const e: ErrorWithStatus = new Error("Account Not Found");
			e.status = 404;
			return `${e.message}, Status:${e.status}`;
		} else {
			await Account.destroy({
				where: { id: accountId }
			});

			return { success: true };
		}
	}

	async accountFind(accountId) {
		const foundAccount = await Account.findOne({
			where: { id: accountId }
		});

		if (!foundAccount) {
			const e: ErrorWithStatus = new Error("Account Not Found");
			e.status = 404;
			return `${e.message}, Status:${e.status}`;
		}

		return foundAccount;
	}

	async accountUpdate(accountId, accountObj) {
		const updatedAccount = await Account.update(
			{ accountObj },
			{ where: { id: accountId } }
		);

		return updatedAccount;
	}
}

export const accountController = new AccountService();
