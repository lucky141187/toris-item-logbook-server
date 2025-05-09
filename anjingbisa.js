const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
const db = require("./connection")
const response = require("./response")
const cors = require("cors")
const session = require('express-session');

app.use(bodyParser.json())
app.use(express.json())

app.use(cors({
  origin: 'http://127.0.0.1:5500', // <-- EXACTLY match this with the browser origin
  credentials: true
}));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // only true if using HTTPS
    httpOnly: true,
    sameSite: 'lax', // or 'none' if cross-site with HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

   //fungsi tombol login
app.post('/akundblogin', (req, res) => {
  const { nameInput, passInput } = req.body;

  req.session.nameInput = nameInput;
  
  const sql = `SELECT * FROM akundb WHERE username = ? AND password = ?`
  db.query(sql, [nameInput, passInput], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.json({ alert: 'Logged in as ' + nameInput });
        
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  );
});
//fungsi tombol login end

//fungsi tombol logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Logout failed');
    }
    // Clear the cookie
    res.clearCookie('connect.sid'); // Default name for express-session cookie
    res.redirect('http://127.0.0.1:5500/'); // Or send a response to let the client handle it
  });
});
//fungsi tombol logout (end)

// server tombol otorisasi
app.put("/otorisasi", (req, res) => {
  // const newName = req.session.username; // get from session
  const { id, posession } = req.body;

  const sql = `UPDATE alatukur SET posession = ? WHERE id = ?`;

  db.query(sql, [posession, id], (err, result) => {
    if (err) {
      console.error("SQL error:", err);
      return response(500, "Database error", "error", res);
    }

    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: 'Update successful'
      };
      response(200, data, "Update data successfully", res);
    } else {
      response(404, "Item not found", "error", res);
    }
  });
});
// server tombol otorisasi (end)

// server tombol generasi expire list
app.get('/generation', (req, res) => {
  
  const sql = `SELECT * FROM alatukur ORDER BY calibrationexpire ASC`;

  db.query(sql,(err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});
// server tombol generasi expire list (end)


  app.get("/get", (req, res) => {
    // response(200, "ini data", "ini message", res)
    db.query("SELECT * FROM torjoblist", (error, result) => {
      console.log(result)
      res.send(result)
    })
  })

//ketika menekan tombol search di main menu
app.get('/search', (req, res) => {
  const kuehri = req.query.q;
  const sql = `SELECT * FROM alatukur WHERE id = ${kuehri}`;
  db.query(sql,(err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});
//ketika menekan tombol search di main menu (end)


// app.get("/", (req, res) => {
//   response(200, "akundb get list", "test", res)
// })

app.get("/akundbget", (req, res) => {
  const sql = "SELECT * FROM akundb"
  db.query(sql, (err, fields) => {
    console.log(fields)
  })
  // response(200, `spesifik akundb by id ${id}`, "", res)
})

// fungsi tombol register
app.post("/akundbpost", (req, res) => {
  const { daftarnama, daftarpassword } = req.body

  // console.log(req.body)

  const checkQuery = 'SELECT id FROM akundb WHERE username = ?';
  db.query(checkQuery, [daftarnama], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0) return res.status(400).send('Username already taken');
    
    const sql = `INSERT INTO akundb (username, password) VALUES (?, ?)`;
    db.query(sql, [daftarnama, daftarpassword], (err, fields) => {
      if (err) throw err
      if(fields.affectedRows){
        response(200, fields.insertId, "Data Added Successfuly", res)
      } else {
        console.log("gak masuk")
      }
    })
  })
  
})
// fungsi tombol register end

// fungsi tombol register device
app.post("/registerdevice", (req, res) => {
  const { idNumber, itemDescription, calibrationExpire } = req.body

  // console.log(req.body)

  const checkQuery = 'SELECT id FROM alatukur WHERE id = ?';
  db.query(checkQuery, [idNumber], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0) return res.status(400).send('ID Number already taken');
    
    const sql = `INSERT INTO alatukur (id, itemdescription, calibrationexpire) VALUES (?, ?, ?)`;
    db.query(sql, [idNumber, itemDescription, calibrationExpire], (err, fields) => {
      if (err) throw err
      if(fields.affectedRows){
        response(200, fields.insertId, "Data Added Successfuly", res)
      } else {
        console.log("gak masuk")
      }
    })
  })
  
})
// fungsi tombol register device end

app.delete("/akundbdelete", (req, res) => {
  const { id } = req.body
  const sql = `DELETE FROM akundb WHERE id = ${id}`

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res)
    if (fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        
      }
      response(200, data, "data deleted successfully", res)
    } else {
      response(404, "user not found", "error", res)
    }
  })
  
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
