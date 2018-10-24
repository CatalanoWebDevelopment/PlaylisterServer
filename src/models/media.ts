module.exports = function(sequelize, DataTypes) {
	return sequelize.define("media", {
		name: DataTypes.STRING,
		url: DataTypes.STRING,
		thumbUrl: DataTypes.STRING,
		available: DataTypes.BOOLEAN,
		size: DataTypes.BLOB,
		length: DataTypes.INTEGER
	});
};
