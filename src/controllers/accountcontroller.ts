import { sequelize } from "../db";

const Account = sequelize.import("../models/account");

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
