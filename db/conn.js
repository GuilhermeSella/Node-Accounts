const Sequelize = require("sequelize")

const conn = new Sequelize("accountNode", "root", "password",{
    host:"localhost",
    dialect:"mysql"
})

module.exports = conn;