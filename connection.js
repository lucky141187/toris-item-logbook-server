const mysql = require('mysql')

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "torishimajoblist"
    
})

module.exports = db