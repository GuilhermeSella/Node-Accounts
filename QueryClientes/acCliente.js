import { conn } from "../db/conn.js"
import { Dashboard, operation } from "../index.js"

export const Cadastro = (nome,senha)=>{
    let query = `INSERT INTO Contas (nomeCli, senhaCli, saldoCli) VALUES (?, ?, 0)`
    conn.query(query, [nome,senha],(err, res)=>{
        if(err){
            console.log(err)
        }
    })
}

export const LoginConta = async (nome, senha)=>{
    const query = `SELECT * FROM Contas WHERE nomeCli = ? and senhaCli = ?`

    conn.query(query, [nome,senha], (error,result)=>{
        if(error){
            console.log(error)
        }
        
        if(result.length == 0){
            console.clear()
            console.log("Credenciais inválidas")
            operation();
        }
        else if(result[0].nomeCli == nome && result[0].senhaCli == senha){
            Dashboard(nome)
            
        }
        
       
    })
    
}