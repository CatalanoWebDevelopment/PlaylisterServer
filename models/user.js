module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        name: DataTypes.STRING,
        account_id: DataTypes.INTEGER
    })
}