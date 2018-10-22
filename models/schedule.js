module.exports = function (sequelize, DataTypes) {
    return sequelize.define('schedule', {
        account_id: DataTypes.INTEGER,
        group_id: DataTypes.INTEGER,
        playlist_id: DataTypes.INTEGER,
        screen_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        date: DataTypes.DATE
    })
}