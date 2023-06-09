//Modulos externos
const chalk = require("chalk")
const inquirer = require('inquirer')


//Modulos internos
const fs = require('fs')
const { default: Choices } = require("inquirer/lib/objects/choices")
const { error, Console } = require("console")

operation();

function operation(){
    inquirer.prompt([{
        type:'list',
        name:'action',
        message:"O que você deseja?",
        choices:[   
            "Criar Conta",
            "Consultar Saldo",
            "Depositar",
            "Sacar",
            "Sair"
        ],
    }])
    .then((res)=>{
        const action = res['action']
        if(action === "Criar Conta"){
            createAccount();
        } 
        else if(action === "Consultar Saldo"){
            consultarSaldo();
        }
        else if(action === "Depositar"){
            depositar();
        }
        else if(action === "Sacar"){
            sacar()
        }
        else if(action === "Sair"){
           console.log(chalk.bgBlue.black('Obrigado por usar o nosso banco!'))
           process.exit();
        }

    })
    .catch((err)=>{
        console.log(error)
    })
}

//Criando conta
function createAccount(){
    console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta"))
    Account();
}
function Account(){
    inquirer.prompt([{
        name: "nameAccount",
        message:"Digite o seu nome:"
    }])
    .then((res) =>{
        const name = res['nameAccount']
        
        if(!fs.existsSync('contas')){
            fs.mkdirSync('contas')
        }

        if(fs.existsSync(`contas/${name}.json`)){
            console.log(chalk.bgRed.black('Essa conta já existe!'))
            Account();
        }

        fs.writeFileSync(`contas/${name}.json`, '{"balance":0}', function(error){
            console.log(error)
        })

        console.log(chalk.green("Parabéns sua conta foi criada!"))
        operation();

    })
    .catch((error)=>{
        console.log(error)
    })
}


//Função de Deposito.

function depositar(){
    inquirer.prompt([{
        name:"nomeConta",
        message:"Qual o nome da sua conta?"
    }])
    .then((res)=>{
        const nomeConta = res['nomeConta']

       //Verificar conta
       if(!verificaConta(nomeConta)){
        return operation();
       }
       inquirer.prompt([{
        name:"amount",
        message:"Quando você deseja depositar?"
        
       }
       
    ]) .then((res)=>{
            const amount = res['amount']
            addAmount(nomeConta, amount);
            operation();
        })
       .catch((error)=>{
        console.log(error)
       })

    })
    .catch((err)=>{
        console.log(err)
    })
}


function verificaConta(nameAccount){
    if(!fs.existsSync(`contas/${nameAccount}.json`)){
        console.log(chalk.bgRed.black("Essa conta não Existe!"));
        return false;
    }
    return true
}

function addAmount(nameAccount, amount){
    const conta = getAccount(nameAccount);
    
    if(!amount){
        console.log(chalk.bgRed("Ocorreu um erro, tente novamente!"))
        return depositar();
    }

    conta.balance = parseFloat(amount) + parseFloat(conta.balance);

    fs.writeFileSync(`contas/${nameAccount}.json`, JSON.stringify(conta),
    function(error){
        console.log(chalk.bgRed(Error))
    },
    )
    console.log(chalk.green(`Foi depositado R$${amount} em sua conta.`))

}

function getAccount(nameAccount){
    const contaJson = fs.readFileSync(`contas/${nameAccount}.json`, {
        encoding:"utf-8",
        flag:'r'
    })

    return JSON.parse(contaJson)
}



//SALDO DA CONTA

function consultarSaldo(){
    inquirer.prompt([{
        name:"nameAccount",
        message:"Qual o nome da sua conta?"
    }])
    .then((res)=>{
        const nameAccount = res['nameAccount']

        if(!verificaConta(nameAccount)){
            return consultarSaldo();

        }

        const conta = getAccount(nameAccount)

        console.log(chalk.bgGreen(`Olá o saldo da sua conta é: ${conta.balance}` ))
        operation();
    })
}


//FUNÇÃO SACAR

function sacar(){
    inquirer.prompt([{
        name:"nameAccount",
        message:"Qual o nome da sua conta?"
    }])
    .then((res)=>{
        const nameAccount = res['nameAccount']

        if(!verificaConta(nameAccount)){
           
            return sacar();
        }

        inquirer.prompt([{
            name:"amount",
            message:"Quando você deseja sacar?"
            
           }
           
        ]) .then((res)=>{
                const amount = res['amount']
                removeAmount(nameAccount,amount)
             
            })
           .catch((error)=>{
            console.log(error)
           })


    })

}

function removeAmount(nameAccount,amount){

    const conta = getAccount(nameAccount)

    if(!amount){
        console.log(chalk.bgRed.black('Erro! Tente novamente'))
        return sacar()
    }

    if(conta.balance < amount){
        console.log(chalk.bgRed.black('Valor indisponível'))
        return sacar();
    }

    conta.balance = parseFloat(conta.balance) - parseFloat(amount)

    fs.writeFileSync(`contas/${nameAccount}.json`,
        JSON.stringify(conta),
        function(err){
            console.log(err)
        }
    )

    console.log(chalk.green(`Saque realizado. Valor do Saque: R$${amount}`))
    operation();

}