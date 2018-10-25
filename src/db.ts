const Sequelize = require("sequelize");

export const sequelize = new Sequelize(
	"playlister",
	"postgres",
	process.env.PASS,
	{
		host: "localhost",
		dialect: "postgres"
	}
);

sequelize.authenticate().then(
	function() {
		console.log("Connected to Playlister Database.");
	},
	function(err) {
		console.log(err);
	}
);
