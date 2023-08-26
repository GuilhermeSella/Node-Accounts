import {conn} from "../db/conn.js"
import { DataTypes } from "sequelize"

export const Cliente = conn.define("Cliente",{
    idCliente:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nomeCliente:{
        type:DataTypes.STRING,
    },
    senhaCliente:{
        type:DataTypes.STRING
    },
    saldoCliente:{
        type:DataTypes.DECIMAL(15, 2) 
    }
    
}, {
    timestamps:false
})