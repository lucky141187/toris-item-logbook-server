const mysql = require('mysql')

const db = mysql.createConnection({
    host : "127.0.0.1",
    port : 3306,
    user : "u275669251_lucky141187",
    password : "Lucian~7~",
    database : "u275669251_torishimajobdb",
    
})

module.exports = db
