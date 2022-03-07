const https = require ("https");
const requestHandler = require ("./routes");
const express = require('express');
const res = require("express/lib/response");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.get('/', function(req, res) {
    https.get('https://dog.ceo/api/breeds/list/all', (resp) => {
    let data = '';

// A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {        
        const dogData = JSON.parse(data).message;    
        res.render("index", {list: dogData})
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

  });

  app.post("/", (req, res)=>{
        const searchBreed = req.body.message;    
        https.get("https://dog.ceo/api/breed/"+searchBreed+"/images/random", (resp) => {
        let data = '';
    
    // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
           
            const dogImg = JSON.parse(data).message;
        
            res.render("image", {img: dogImg})
        });
    
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
  })

  app.listen(3000, ()=>{
    console.log("working on port 3000")
});