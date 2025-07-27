
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db.js');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const [rows] = await db.execute("SELECT password_hash FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).send("Email not found.");
    }

    const isMatch = await bcrypt.compare(pass, rows[0].password_hash);

    if (isMatch) {
      
      res.redirect('/Index.html');
    } else {
      res.status(401).send("Invalid password.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed.");
  }
});

module.exports = router;
