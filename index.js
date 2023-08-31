//Modulos externos
import chalk from "chalk"
import inquirer from "inquirer"
import { Cadastro, LoginConta, SaldoConta } from "./QueryClientes/acCliente.js"


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


export function Dashboard(nome, idCli){
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
            VerSaldo(nome, idCli);
        }
        else if(OptionUser === "Histórico de transações"){

        }
        else if(OptionUser === "Depositar"){

        }
        else if(OptionUser === "Sacar"){

        }
        else{
            console.clear()
            operation();
        }

    })
}


function VerSaldo(nome, idCli){
    console.log(`${nome} o saldo da sua conta é de:`)
    SaldoConta(idCli);
}

function VerHistorico(){

}

function Depositar(){

}

function Sacar(){

}







