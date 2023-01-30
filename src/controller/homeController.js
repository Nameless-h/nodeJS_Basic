
import pool from '../configs/connectDB';

let getHomepage = async (req,res) => {
    // query database
    const [rows, fields] = await pool.execute('SELECT * FROM users ');
    return res.render('index.ejs', {dataUser:rows});
}

let getDetailPage = async (req,res)=> {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId]);
    return res.send(JSON.stringify(user))    
}

let createNewUser = async (req,res) => {
    console.log('Check request ',req.body);
    let {firstName,lastName,email,address} = req.body;
    await pool.execute(`insert into users(firstName,lastName,email,address) 
                        value(?,?,?,?)` , [firstName,lastName,email,address])
    return res.redirect('/')//return to '/'
}

module.exports = {//export for other files can use
    getHomepage ,getDetailPage,createNewUser
}