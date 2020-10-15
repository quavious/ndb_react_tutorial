import express from "express"
import bodyParser from "body-parser";

const app = express()
const port = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/customers", (req, res) => {
    res.send([
        {
            id: 1,
            image: "https://placeimg.com/64/64/1",
            name: "홍길동",
            birth: "961222",
            gender: "남자",
            job: "대학생"
        },
        {
            id: 2,
            image: "https://placeimg.com/64/64/2",
            name: "김공익",
            birth: "961222",
            gender: "남자",
            job: "대학생"
        },
        {
            id: 3,
            image: "https://placeimg.com/64/64/3",
            name: "이공군",
            birth: "991220",
            gender: "남자",
            job: "부사관"
        },
    ])
})

app.listen(port, () => console.log("Server On 5000"))