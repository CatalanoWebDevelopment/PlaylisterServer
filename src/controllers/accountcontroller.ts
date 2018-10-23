const Account = require("../db").import("../models/account");

interface ErrorWithStatus extends Error {
	status?: number;
	message: string;
}

class AccountService {
	async accountCreate(accountObj) {
		const createdAccount = await Account.create({
			name: accountObj.name
		});

		return createdAccount;
	}

	async accountDelete(accountId) {
		const foundAccount = await Account.findOne({
			where: { id: accountId }
		});

		if (!foundAccount) {
			const e: ErrorWithStatus = new Error("Account Not Found");
			return e.message;
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
			return e.message;
		}

		return foundAccount;
	}

	async accountUpdate(accountObj) {
		const foundAccount = await Account.findOne({
			where: { id: accountObj }
		});

		if (!foundAccount) {
			const e: ErrorWithStatus = new Error("Account Not Found");
			return e.message;
		} else {
			await foundAccount.update(accountObj.request.body);
			return {
				success: true,
				foundAccount
			};
		}
	}
}

export const accountController = new AccountService();
