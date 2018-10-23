export const errorHandler = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		ctx.body = {
			success: false,
			error: error.message
		};

		ctx.status = error.status || 503;
	}
};
