const express = require('express');// import all librabies already install 
const app = express();
const port = 3000;

app.get('/', (req,res)=> {
    res.send('hello world! everyone');
})

app.get('/about', (req,res)=> {
    res.send('hi Hao');
})

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`)
})