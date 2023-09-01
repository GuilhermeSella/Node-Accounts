import { conn } from "../db/conn.js"
import { Dashboard, operation } from "../index.js"

export const Cadastro = (nome,senha)=>{
    let query = `INSERT INTO Contas (nomeConta, senhaConta, saldoConta) VALUES (?, ?, 0)`
    conn.query(query, [nome,senha],(err, res)=>{
        if(err){
            console.log(err)
        }
    })
}

export const LoginConta = async (nome, senha)=>{
    const query = `SELECT * FROM Contas WHERE nomeConta = ? and senhaConta = ?`

    conn.query(query, [nome,senha], (error,result)=>{
        if(error){
            console.log(error)
        }
        
        if(result.length == 0){
            console.clear()
            console.log("Credenciais inválidas")
            operation();
        }
        else if(result[0].nomeConta == nome && result[0].senhaConta == senha){
            Dashboard(nome, result[0].idConta)
            
        }
        
       
    })
    
}

export const SaldoConta= (idConta)=>{
    
    const query = `SELECT saldoCli FROM Contas WHERE idConta = ?`;
    var saldo =  conn.query(query, [idConta], (error, result)=>{
        console.log(result[0].saldoConta)
        return result[0].saldoConta
        
    })
    return saldo;
}

export const acDepositar = (valorDeposito, idConta) => {
    const querysaldo = `SELECT saldoConta FROM Contas WHERE idConta = ?`
    conn.query(querysaldo, [idConta], (Error, result)=>{
        const valorAtual = result[0].saldoConta
       queryDeposito(valorAtual)

    })

    function queryDeposito(saldoAtual){
        const novoSaldo = saldoAtual + valorDeposito;
        const query = `UPDATE Contas SET saldoConta = ? WHERE idConta = ?`
        conn.query(query, [novoSaldo, idConta], (error)=>{
            if(error){
                console.log(error)
            }
            console.clear();
            console.log("Deposito realizado com sucesso! Valor: " + valorDeposito);
        })
        
    }

}

export const Historico = ()=>{

}