import conn from "../db/conn"
import { DataType, DataTypes } from "sequelize"

const Cliente = conn.define("Cliente",{
    idCliente:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nomeCliente:{
        type:DataTypes.STRING,
    },
    cpfCliente:{
        type:DataTypes.STRING(11)
    },
    saldoCliente:{
        type:DataTypes.DECIMAL(15, 2) 
    }
    
})