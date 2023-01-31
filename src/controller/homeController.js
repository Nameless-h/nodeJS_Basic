
import pool from '../configs/connectDB';
import multer from 'multer';

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

let getUploadFilePage = async(req,res)=> {
    return res.render('uploadFile.ejs')
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// 'profile_pic' is the name of our file input field in the HTML form
const upload = multer().single('profile_pic');

let handleUploadFile = async(req,res)=> {
     upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`  <div style="text-align:center;color:green;width:100%">
                    <a href="/upload" style="color:green;text-transform:uppercase;text-decoration:none;font-weight:600;font-size:17px">Upload another image</a>
                    </div>
                    <hr/>
                    <div style="text-align:center;">
                    <img src="/image/${req.file.filename}" width="80%" style="object-fit:cover;max-height:650px;"><hr/>
                    </div>
                    `);
    });
}


module.exports = {//export for other files can use
    getHomepage ,getDetailPage,createNewUser,deleteUser,getEditPage,postUpdateUser,getUploadFilePage,handleUploadFile
}