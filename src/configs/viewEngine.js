import  express from "express";

const configViewEngine =(app)=> {
    app.use(express.static('./src/public')),//allow express access to public folder
    app.set("view engine","ejs"),//view engine will use ejs
    app.set("views","./src/views")//all file ejs only found in src/views
}

export default configViewEngine;