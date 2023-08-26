import { Sequelize } from "sequelize"

export const conn = new Sequelize("accountNode", "root", "password",{
    host:"localhost",
    dialect:"mysql"
})
