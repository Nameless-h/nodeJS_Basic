import express from "express"
import configViewEngine from "./configs/viewEngine";
require('dotenv').config();

//const express = require('express');// import all librabies already install 
const app = express();

// || 8080 it means if port return underfined ,it will return 8080 (we call this thing is backup)
const port = process.env.PORT || 3000;//process.env.PORT get value of variable in .env,

configViewEngine(app); // app: express app

app.get('/', (req,res)=> {
    res.render('index.ejs');
})

app.get('/about', (req,res)=> {
    res.send('hi Hao');
})

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`)
})