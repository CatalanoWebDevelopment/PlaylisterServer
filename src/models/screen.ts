module.exports = function(sequelize, DataTypes) {
	return sequelize.define("screen", {
		name: DataTypes.STRING
	});
};
