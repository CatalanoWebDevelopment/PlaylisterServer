module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        account_id: DataTypes.INTEGER
    })
}