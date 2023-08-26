import {Cliente} from '../Model/Cliente.js'

export const Cadastro = async(nome,senha)=>{
    const cliente = await Cliente.create({
        nomeCliente:nome,
        senhaCliente:senha,
        saldoCliente:0
    })
}

export const Login = async(nome)=>{
    const dadosCLI = await Cliente.findAll({
        where:{
          nomeCliente:nome  
        }
    })
    
}

