module.exports = function (sequelize, DataTypes) {
    return sequelize.define('screen', {
        account_id: DataTypes.INTEGER,
        group_id: DataTypes.INTEGER,
        name: DataTypes.STRING
    })
}