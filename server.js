import db from "./database.js";
import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import bodyparser from "body-parser";
import mysql from "mysql";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));

db.getConnection(async (err, connection) => {
    if (err) throw (err)
    console.log("DB connected successful: " + connection.threadId)
})

app.post("/createUser", async (req, res) => {
    console.log("i am in");
   
    var  Username=req.body.Username;
    console.log(Username);
    var Email=req.body.Email;
    console.log(Email);
    var Image_name=req.body.Image_name;
    
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    var Password = hashedPassword;

    db.getConnection(async (err, connection) => {
        if (err) {
            console.log("here error");
            throw (err);
        }

        const sqlSearch = "SELECT * FROM user_new_table WHERE Email = ? OR Username = ?";
        const search_query = mysql.format(sqlSearch, [Email, Username]);

        const sqlInsert = "INSERT INTO user_new_table VALUES (0,?,?,?,?)";
        const insert_query = mysql.format(sqlInsert, [Username, Password, Email, Image_name]);

        await connection.query(search_query, async (err, result) => {
            if (err) throw (err);

            console.log("------> Search Results");
            console.log(result.length);

            if (result.length !== 0) {
                connection.release();
                console.log("------> Username OR Email already exists");
                res.send("Username OR Email already exists");
            } else {
                await connection.query(insert_query, (err, result) => {
                    connection.release();
                    if (err) {
                        console.log("error");
                        throw (err);
                    }
                    console.log("--------> Created new User");
                    console.log(result.insertId);
                    res.sendStatus(201);
                });
            }
        });
    });
});


app.post("/login", (req, res)=> {
    
   
    const Username=req.body.Username;
    console.log(Username);
    const Password = req.body.Password;
    db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = "Select * from user_new_table where  Username= ? "
     const search_query = mysql.format(sqlSearch,[Username])
     await connection.query (search_query, async (err, result) => {
      connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       return res.send( "User not found");
      } 
      else {
         const hashedPassword = result[0].Password
         //get the hashedPassword from result
        if (await bcrypt.compare(Password, hashedPassword)) {
        console.log("Login Successful")
        res.send(`${result[0].Username} is logged in!`)

        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } 
      }
     }) 
    }) 
    }) 





const port = 8081;

app.listen(8081, () => console.log(`Server Started on port ${port}...`));
