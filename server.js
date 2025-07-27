const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


app.use('/register', registerRoute);
app.use('/login', loginRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
