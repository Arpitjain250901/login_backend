import  mysql from "mysql";


const db = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",       
    user: "kumkum",       
    password: "password#123", 
    database: "userdb",     
    port: "3306"           
 })
 
 

 
 export default db;