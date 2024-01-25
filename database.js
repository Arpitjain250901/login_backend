import  mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);


// const db = mysql.createPool({
//     connectionLimit: 100,
//     host: "127.0.0.1",       
//     user: "kumkum",       
//     password: "password#123", 
//     database: "userdb",     
//     port: "3306"           
//  })

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST || "your-database-hostname",
    user: process.env.DB_USER || "your-database-username",
    password: process.env.DB_PASSWORD || "your-database-password",
    database: process.env.DB_DATABASE || "your-database-name",
    port: process.env.DB_PORT || "your-database-port"
});

// const db = mysql.createConnection({
//     user:"root",
//     host: "127.0.0.1",
//     password: "arpit@1234567890",
//     database: "userdb",
//  });
 

 

 
 export default db;