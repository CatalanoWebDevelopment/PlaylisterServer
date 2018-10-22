const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('winemaster', 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function() {
        console.log("Connected to Playlister Database.")
    },
    function(err) {
        console.log(err)
    }
);

module.exports = sequelize;