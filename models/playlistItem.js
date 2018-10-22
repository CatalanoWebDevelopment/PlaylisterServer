module.exports = function (sequelize, DataTypes) {
    return sequelize.define('playlist_item', {
        account_id: DataTypes.INTEGER,
        playlist_id: DataTypes.INTEGER,
        media_id: DataTypes.INTEGER,
        next_action: DataTypes.BLOB
    })
}