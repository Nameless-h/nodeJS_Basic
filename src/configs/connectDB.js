// get the client
// const mysql = require('mysql2');//old syntax
import mysql from 'mysql2/promise';// new syntax


// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbasic'
// });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'

})

// // simple query
// connection.query(
//   'SELECT * FROM `users` ',
//   function(err, results, fields) {

//     console.log(results); // results contains rows returned by server
//   }
// );

export default pool ;
