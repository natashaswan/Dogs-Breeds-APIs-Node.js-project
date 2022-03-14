const https = require ("https");
const express = require('express');
const res = require("express/lib/response");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//homepage
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

//image page with a rendered image
  app.post("/image", (req, res)=>{
        const searchBreed = req.body.dogButton; 
        https.get("https://dog.ceo/api/breed/"+searchBreed+"/images/random", (resp) => {
        let data = '';
    
    // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
    // The whole response has been received. Print out the result.
        resp.on('end', () => {           
            const dogImg = JSON.parse(data).message;                 
            res.render("image", {img: dogImg, title: searchBreed})
        });
    
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
  });

//list of breeds page
  app.get('/list', function(req, res) {
    https.get('https://dog.ceo/api/breeds/list/all', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {        
        const dogData = JSON.parse(data).message;    
        res.render("list", {list: dogData})
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

  });
  
//smile page
app.get('/smile', function(req, res) {
    https.get('https://dog.ceo/api/breeds/image/random', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {        
        const dogImg = JSON.parse(data).message;    
        res.render("smile", {img: dogImg})
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

  });

  app.listen(3000, ()=>{
    console.log("working on port 3000")
});