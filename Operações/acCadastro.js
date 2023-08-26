const Cliente = require("../Model/Cliente.mjs")

const Cadastro = async(nome,cpf)=>{
    const cliente = await Cliente.create({
        nomeCliente:nome,
        cpfCliente:cpf,
        saldoCliente:0
    })
}


module.exports = Cadastro;