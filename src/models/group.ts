module.exports = function (sequelize, DataTypes) {
    return sequelize.define('group', {
        name: DataTypes.STRING,
        account_id: DataTypes.INTEGER
    })
}