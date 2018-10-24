module.exports = function(sequelize, DataTypes) {
	return sequelize.define("playlist", {
		name: DataTypes.STRING
	});
};
