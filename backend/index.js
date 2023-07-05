const express = require ("express");
const {connection} = require("./db")
const app = express()
const cheerio = require('cheerio');

const axios = require('axios');
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const {countRouter} = require("./routes/count.route")

//  app.use(countRouter)

// app.get("/check",(req,res)=>{
//     res.status(200).json({"msg":"working fine"})
// })

app.post('/api/wordcount', (req, res) => {
    const websiteUrl = req.body.url;
  
    axios.get(websiteUrl)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
  
        const textElement = $('body');
        const words = textElement.text().split(/\s+/);
        const wordCount = words.length;
           res.json({ wordCount });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error fetching website.' });
      });
  });


app.listen(8080,async()=>{

    try {
        await connection
        console.log("connected to atlas data base!!!!!!!!")
    } catch (error) {
        console.log(error)
    }
console.log("server runs on port 8080")
})
