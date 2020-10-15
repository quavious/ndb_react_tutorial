import express from "express"
import bodyParser from "body-parser";

const app = express()
const port = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/hello", (req, res) => {
    res.send({message: "Hello World!"})
})

app.listen(port, () => console.log("Server On 5000"))