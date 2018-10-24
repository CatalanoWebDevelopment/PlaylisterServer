module.exports = function(sequelize, DataTypes) {
	return sequelize.define("playlist_item", {
		next_action: DataTypes.BLOB
	});
};
