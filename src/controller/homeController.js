
import { json } from 'body-parser';
import { render } from 'ejs';
import pool from '../configs/connectDB';

let getHomepage = async (req,res) => {
    // query database
    const [rows, fields] = await pool.execute('SELECT * FROM users ');
    return res.render('index.ejs', {dataUser:rows});
}

let getDetailPage = async (req,res)=> {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId]);
    return res.render('details.ejs',{dataUser: user[0]})   
}

let createNewUser = async (req,res) => {
    let {firstName,lastName,email,address} = req.body;
    await pool.execute(`insert into users(firstName,lastName,email,address) 
                        value(?,?,?,?)` , [firstName,lastName,email,address])
    return res.redirect('/')//return to '/'
}

let deleteUser = async (req,res)=> {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?',[userId]);
    return res.redirect('/')//return to '/'
}

let getEditPage = async (req,res)=> {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?',[id]);
    return res.render('update.ejs',{dataUser: user[0]})
}

let postUpdateUser = async(req,res)=> { 
    let {firstName,lastName,email,address,id} = req.body;
    await pool.execute(`update users 
                        set firstName = ? ,lastName = ?, email = ? , address = ? 
                        where id = ?` , 
                        [firstName,lastName,email,address,id]);
    return res.redirect('/') 
}

module.exports = {//export for other files can use
    getHomepage ,getDetailPage,createNewUser,deleteUser,getEditPage,postUpdateUser
}