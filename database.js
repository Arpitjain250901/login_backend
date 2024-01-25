import  mysql from "mysql";


// const db = mysql.createPool({
//     connectionLimit: 100,
//     host: "127.0.0.1",       
//     user: "kumkum",       
//     password: "password#123", 
//     database: "userdb",     
//     port: "3306"           
//  })
 

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "kumkum",
    password: process.env.DB_PASSWORD || "password#123",
    database: process.env.DB_DATABASE || "userdb",
    port: process.env.DB_PORT || "3306"
});

 

 
 export default db;