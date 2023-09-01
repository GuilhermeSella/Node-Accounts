//Modulos externos
import chalk from "chalk"
import inquirer from "inquirer"
import { Cadastro, LoginConta, SaldoConta, acDepositar } from "./QueryClientes/acCliente.js"


//Modulos internos

operation()

export function operation(){
    inquirer.prompt([{
        type:'list',
        name:'Inicio',
        message:"Bem vindo ao nosso banco! O que você deseja?",
        choices:[   
            "Criar Conta",
            "Login",
        ],
    }])
    .then((res)=>{
        const option = res['Inicio']

        if(option == "Criar Conta"){
            console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!"))
            console.log(chalk.green("Defina as opções da sua conta"))
            CadastroConta();
        } 

        else {
            loginAccount();
        }
       
    })
    .catch((error)=>console.log(error))
}


function CadastroConta(){
    inquirer.prompt([{
        name: "nameAccount",
        message:"Digite o seu nome:"
    },
    {
        name:"senhaCliente",
        message:"Digite uma senha:"
    },
    {
        name:"confirmsenhaCliente",
        message:"Confirme a senha:"
    }
])
    .then((res) =>{
        const nome = res['nameAccount']
        const senha = res["senhaCliente"]
        const confirmSenha = res['confirmsenhaCliente']
        if(senha === confirmSenha){
            console.clear()
            console.log("Cadastro realizado com sucesso!")
            Cadastro(nome,senha)
            
        }
        else{
            console.clear();
            console.log("As senhas não coincidem!")
            CadastroConta();
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}


export function loginAccount(){
    inquirer.prompt([
        {
            name:"nomeAccount",
            message:"Digite o seu nome:"
        },
        {
            name:"senhaAccount",
            message:"Senha:"
        }
    ])
    .then((res)=>{
        const nome = res['nomeAccount']
        const senha = res["senhaAccount"]
        LoginConta(nome, senha)
        
    })
}


export function Dashboard(nome, idConta){
    console.clear()
    console.log(`Bem-vindo ${nome}!`)
    inquirer.prompt([
        {
            type:"list",
            name:"OptionUser",
            message:"O que deseja?",
            choices:[
                "Ver saldo",
                "Histórico de transações",
                "Depositar",
                "Sacar",
                "Sair"
            ]
        }
    ]).then((res)=>{
        const OptionUser = res["OptionUser"];
        if(OptionUser === "Ver saldo"){
            VerSaldo(nome, idConta);
        }
        else if(OptionUser === "Histórico de transações"){
            VerHistorico();
        }
        else if(OptionUser === "Depositar"){
            Depositar(nome, idConta);
        }
        else if(OptionUser === "Sacar"){
            Sacar(nome,idConta);
        }
        else{
            console.clear()
            operation();
        }

    })
}


function VerSaldo(nome, idCli){
    const saldo = SaldoConta(idCli)
    console.log(`${nome} o saldo da sua conta é de: ${saldo}`)
    inquirer.prompt([{
        type: 'input',
        name: 'Voltar',
        message: 'Pressione enter para voltar...',
        filter: () => {
            return '';
        }
    }]).then(()=>Dashboard(nome,idCli));
}

function VerHistorico(){

}

function Depositar(nome, idConta){
    inquirer.prompt([
        {
            name:"valorDeposito",
            message:"Quanto deseja depositar?",
            validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Por favor, insira um número válido';
            },
        }
    ]).then((res)=>{
        const valorDeposito = res["valorDeposito"]
        acDepositar(valorDeposito, idConta)
        inquirer.prompt([{
            type: 'input',
            name: 'Voltar',
            message: 'Pressione enter para voltar...',
            filter: () => {
                return '';
            }
        }]).then(()=>Dashboard(nome,idConta));
    })

}

function Sacar(nome, idConta){
    inquirer.prompt([
        {
            name:"valorDeposito",
            message:"Quanto deseja depositar?",
            validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Por favor, insira um número válido';
            },
        }
    ]).then((res)=>{
        const valorDeposito = res["valorDeposito"]
        acDepositar(valorDeposito, idConta)
        inquirer.prompt([{
            type: 'input',
            name: 'Voltar',
            message: 'Pressione enter para voltar...',
            filter: () => {
                return '';
            }
        }]).then(()=>Dashboard(nome,idConta));
    })

}







