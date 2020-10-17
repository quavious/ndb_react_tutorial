import express from "express"
import bodyParser from "body-parser";
import mysql from "mysql";
import multer from "multer";

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
const upload = multer({dest: "./upload"})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/image", express.static("./upload"))

app.get("/api/customers", (req, res) => {
    connection.query("select * from customer where isDeleted = 0", (err, rows, fields) => {
        res.send(rows);
    })
})

app.post("/api/customers", upload.single("image"), (req, res) =>{
    let sql = `insert into customer values (null, ?,?,?,?,?,now(),0)`;
    let image = "/image/" + req.file.filename;
    let name = req.body.name;
    let birth = req.body.birth;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birth, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
        if(err){
            console.log(err)
        }
        res.send(rows)
    })
} )

app.delete("/api/customers/:id", (req, res) => {
    let sql = `update customer set isDeleted = 1 where id = ?`
    let params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
        console.log(err)
        res.send(rows);
    })
})

app.listen(port, () => {
    connection.connect()
    console.log("Server On 5000")
})