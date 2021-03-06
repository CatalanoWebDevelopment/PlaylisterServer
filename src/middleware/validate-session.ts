const JWT = require("jsonwebtoken");
const SEQUELIZE = require("../db");
const Users = SEQUELIZE.import("../models/user");

module.exports = function(req, res, next) {
	if (req.method == "OPTIONS") {
		next();
	} else {
		let sessionToken = req.headers.authorization;

		if (!sessionToken)
			return res
				.status(403)
				.send({ auth: false, message: "No token provided." });
		else {
			JWT.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
				if (decoded) {
					Users.findOne({ where: { id: decoded.id } }).then(
						user => {
							req.user = user;
							next();
						},
						function() {
							res.status(401).send({ error: "Not authorized" });
						}
					);
				} else {
					res.status(400).send({ error: "Not authorized" });
				}
			});
		}
	}
};
