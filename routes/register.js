const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db.js');

const router = express.Router();

router.post('/', async (req, res) => {
  const { fname, lname, dob, mobile, email, pass } = req.body;

  if (!fname || !lname || !dob || !mobile || !email || !pass) {
    return res.status(400).send("Please fill all fields.");
  }

  const password_hash = await bcrypt.hash(pass, 10);

  try {
    const sql = `INSERT INTO users (first_name, last_name, dob, mobile, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.execute(sql, [fname, lname, dob, mobile, email, password_hash]);
    res.redirect('/Index.html'); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user.");
  }
});

module.exports = router;
