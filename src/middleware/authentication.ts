import jsonwebtoken from "jsonwebtoken";

export const loginRequired = async (ctx, next) => {
	ctx.assert(ctx.header.authorization, 401, "Authentication Error");
	const parts = ctx.header.authorization.split(" ");
	ctx.assert(parts.length === 2, 401, "Authentication Error");
	const token = parts[1];

	const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

	console.log("PAYLOAD", payload);

	ctx.assert(payload.userId, 401, "Authentication Error");

	ctx.state.userId = payload.userId;

	return next();
};

export const sign = (payload: any, expiresIn: string | false): string => {
	let options;
	if (expiresIn) {
		options = { expiresIn };
	}

	return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
};

// export const decode = (token: string): any =>
// 	jsonwebtoken.verify(token, process.env.SECRET);
