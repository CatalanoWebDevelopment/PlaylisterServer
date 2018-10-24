module.exports = function(sequelize, DataTypes) {
	return sequelize.define("schedule", {
		name: DataTypes.STRING,
		date: DataTypes.DATE
	});
};
