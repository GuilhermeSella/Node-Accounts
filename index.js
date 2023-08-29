//Modulos externos
import chalk from "chalk"
import inquirer from "inquirer"
import { Cadastro } from "./Operações/acCliente.js"


//Modulos internos

operation()

function operation(){
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
            Account();
        } 

        else {
            loginAccount();
        }
       
    })
    .catch((error)=>console.log(error))
}


function Account(){
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
            Account();
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}


function loginAccount(){
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
        const nomeAccount = res['nomeAccount']
        const senhaAccount = res["senhaAccount"]
        Login(nomeAccount)
    })
}







