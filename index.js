//Modulos externos
import chalk from "chalk"
import inquirer from "inquirer"
import { Cadastro, LoginConta, SaldoConta, acDepositar, acSaque, acPagamento } from "./QueryClientes/acCliente.js"


//Modulos internos

operation()

export function operation(){
    console.clear()
    inquirer.prompt([{
        type:'list',
        name:'Inicio',
        message: chalk.bgGreen.white("Bem vindo ao nosso banco! O que você deseja?"),
        choices:[   
            chalk.green("Criar Conta"),
            "Login",
        ],
    }])
    .then((res)=>{
        const option = res['Inicio']

        if(option == "Criar Conta"){
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
                "Realizar pagamento",
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
        else if(OptionUser === "Realizar pagamento"){
            Pagamento(idConta);
        }
        else{
            console.clear()
            operation();
        }

    })
}


function VerSaldo(nome, idCli){
    SaldoConta(nome, idCli)
   
    inquirer.prompt([{
        type: 'input',
        name: 'Voltar',
        message: 'Pressione enter para voltar...',
        filter: () => {
            return '';
        }
    }]).then(()=>Dashboard(nome,idCli));
    
   
}

export function Pagamento(idConta){
    inquirer.prompt([
        {
            name:"DestinatarioId",
            message:"Digite o ID da conta que deseja realizar o pagamento"
        },
        {
            name:"valorpagamento",
            message:"Qual a quantia do pagamento?"
        }
    ])
    .then((res)=>{
        const Destinatario = res["DestinatarioId"];
        const valor = res["valorpagamento"];
        acPagamento(idConta, Destinatario, valor)
    })
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
            name:"valorSaque",
            message:"Quanto deseja sacar?",
            validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Por favor, insira um número válido';
            },
        }
    ]).then((res)=>{
        const valorSaque = res["valorSaque"]
        acSaque(valorSaque, idConta)
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







