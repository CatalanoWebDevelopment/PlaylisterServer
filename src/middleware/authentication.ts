import jsonwebtoken from "jsonwebtoken";

const secret = process.env.SECRET;

export const loginRequired = async (ctx, next) => {
	ctx.assert(ctx.header.authorization, 401, "Authentication Error");
	const parts = ctx.header.authorization.split(" ");
	ctx.assert(parts.length === 2, 401, "Authentication Error");
	const token = parts[1];

	const payload = decode(token);

	ctx.assert(payload.userId, 401, "Authentication Error");

	ctx.state.userId = payload.userId;

	return next();
};

export const sign = (payload: any, expiresIn: string | false): string => {
	let options;
	if (expiresIn) {
		options = { expiresIn };
	}

	return jsonwebtoken.sign(payload, secret, options);
};

export const decode = (token: string): any =>
	jsonwebtoken.verify(token, secret);
