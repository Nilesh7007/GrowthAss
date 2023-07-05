const express = require("express")

const countRouter = express.Router();

const {CountModel} = require("../model/count.model")
const cheerio = require('cheerio');

const axios = require('axios');



countRouter.post('/api/wordcount', (req, res) => {
    const websiteUrl = req.body.url;
  
    axios.get(websiteUrl)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
  
        const textElement = $('body');
        const words = textElement.text().split(/\s+/);
        const wordCount = words.length;
  
       
        const count = new CountModel({ url: websiteUrl, wordCount });

        // Save the count data to the database
        count.save()
          .then(savedCount => {
            res.json({ wordCount: savedCount.wordCount });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error saving count data to the database.' });
          });
    
      })
      .catch(error => {
        res.status(500).json({ error: 'Error fetching website.' });
      });
  });



  countRouter.get("/api/previous",async(req,res)=>{
    
    try {
        const totalPreS= await CountModel.find()
    
        res.send(totalPreS)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
    })

  module.exports = {countRouter}