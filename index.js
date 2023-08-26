//Modulos externos
import chalk from "chalk"
import inquirer from "inquirer"
import {conn} from "./db/conn.js"
import { Cadastro, Login } from "./Operações/acCliente.js"

//Modulos internos

operation()

function operation(){
    inquirer.prompt([{
        type:'list',
        name:'action',
        message:"",
        choices:[   
            "Criar Conta",
            "Login"
        ],
    }])
    .then((res)=>{
        const action = res['action']
        if(action === "Criar Conta"){
            createAccount();
        } 
        if(action == "Login"){
            loginAccount()
        }

    })
    .catch((err)=>{
        console.log(err)
    })
}

function createAccount(){
    console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta"))
    Account();
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
        const name = res['nameAccount']
        const senha = res["senhaCliente"]
        const confirmSenha = res['confirmsenhaCliente']
        if(senha === confirmSenha){
            console.log("Cadastro realizado com sucesso!")
            Cadastro(name,senha)
            operation();
        }
        else{
            console.log("As senhas não coincidem!")
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







conn.sync().then(()=>{
    console.log("Conectado!")
})