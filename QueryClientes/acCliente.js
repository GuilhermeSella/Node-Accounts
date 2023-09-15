import chalk from "chalk"
import { conn } from "../db/conn.js"
import { Dashboard, operation, loginAccount } from "../index.js"

export const Cadastro = (nome,senha)=>{
    let query = `INSERT INTO Contas (nomeConta, senhaConta, saldoConta) VALUES (?, ?, 0)`
    conn.query(query, [nome,senha],(err, res)=>{
        if(err){
            console.log(err)
        }
    })
    console.clear();
    console.log("Entre com sua conta!")
    loginAccount();
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

export const SaldoConta= (nome, idConta)=>{
    
    const query = `SELECT saldoConta FROM Contas WHERE idConta = ?`;
    conn.query(query, [idConta], (error, result)=>{
        if(error){
            console.log(error)
        }
        const saldo = result[0].saldoConta
        console.log(`${nome} o saldo da sua conta é de: ${saldo}`)
        
    })
}

export const acDepositar = (valorDeposito, idConta) => {
    const query = `CALL Deposito(?, ?)`
    conn.query(query, [idConta, valorDeposito], (error)=>{
        if(error){
            console.log(error)
        }
        console.clear();
        console.log("Deposito realizado com sucesso! Valor: " + valorDeposito);
    })

}

export const acSaque = (valorSaque, idConta)=>{
    const query = `CALL Saque(?, ?)`
    conn.query(query, [idConta, valorSaque], (error)=>{
        if(error){
            console.log(error)
        }
        console.clear();
        console.log("Saque realizado com sucesso! Valor do saque: " + valorSaque);
    })

}

export const acPagamento = ( idConta ,idDestinatario, valor)=>{
  
    const consultaSaldo = "SELECT saldoConta FROM Contas WHERE idConta = ?";
    conn.query(consultaSaldo, [idConta], (error, result)=>{
        
        if(error){
            console.log(error)
        }
        
        const saldoConta = result[0].saldoConta;
        
        if(valor > saldoConta){
            console.log(chalk.red("Desculpe mas você não possui essa quantida em seu saldo atual"))
            
        }
        else{
            const procedurePagamento = "CALL Pagamento(?, ?, ?)";
            conn.query(procedurePagamento, [idConta, idDestinatario, valor], (error)=>{
                if(error){
                    console.log(error)
                }
            })
        }

    })
}

export const Historico = ()=>{

}