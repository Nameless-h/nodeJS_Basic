import bodyParser from "body-parser";
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from './route/web';
import initAPIRoute from './route/api';

// import connection from './configs/connectDB';

require('dotenv').config();

//const express = require('express');// import all librabies already install 
const app = express();

// || 8080 it means if port return underfined ,it will return 8080 (we call this thing is backup)
const port = process.env.PORT || 3000;//process.env.PORT get value of variable PORT in .env

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setup view engine
configViewEngine(app); // app: express app

//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`)
})