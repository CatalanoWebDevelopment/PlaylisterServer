module.exports = function (sequelize, DataTypes) {
    return sequelize.define('media', {
        account_id: DataTypes.INTEGER,
        group_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        thumbUrl: DataTypes.STRING,
        available: DataTypes.BOOLEAN,
        size: DataTypes.BLOB,
        length: DataTypes.INTEGER
    })
}