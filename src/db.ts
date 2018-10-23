const Sequelize = require("sequelize");

const seq = new Sequelize("playlister", "postgres", process.env.PASS, {
	host: "localhost",
	dialect: "postgres"
});

seq.authenticate().then(
	function() {
		console.log("Connected to Playlister Database.");
	},
	function(err) {
		console.log(err);
	}
);

module.exports = seq;
