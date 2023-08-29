import mysql from "mysql"

export const conn = mysql.createConnection({
    host:"localhost",
    database:"accountNode",
    user:"root",
    password:"password"
});

conn.connect((error)=>{
    if(error)throw error;
   
})