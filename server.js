import express from "express"
import bodyParser from "body-parser";
import mysql from "mysql";

import dbKey from "./database.js";
const app = express()
const port = 5000;

const dbInfo = dbKey();
const connection = mysql.createConnection({
    host: dbInfo.host,
    user: dbInfo.user,
    password: dbInfo.password,
    port: dbInfo.port,
    database: dbInfo.database,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/customers", (req, res) => {
    connection.query("select * from customer", (err, rows, fields) => {
        res.send(rows);
    })
})

app.listen(port, () => {
    connection.connect()
    console.log("Server On 5000")
})