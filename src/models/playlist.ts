module.exports = function (sequelize, DataTypes) {
    return sequelize.define('playlist', {
        account_id: DataTypes.INTEGER,
        group_id: DataTypes.INTEGER,
        name: DataTypes.STRING
    })
}