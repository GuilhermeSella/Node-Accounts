import { conn } from "../db/conn.js"

export const Cadastro = (nome,senha)=>{
    let query = `INSERT INTO clientes (nomeCli, senhaCli, saldoCli) VALUES ('${nome}', '${senha}', 0)`
    conn.query(query, (err, res)=>{
        if(err){
            console.log(err)
        }
    })
}