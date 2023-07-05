const express = require ("express");
const {connection} = require("./db")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const {countRouter} = require("./routes/count.route")

 app.use(countRouter)

app.listen(8080,async()=>{

    try {
        await connection
        console.log("connected to atlas data base!!!!!!!!")
    } catch (error) {
        console.log(error)
    }
console.log("server runs on port 8080")
})
