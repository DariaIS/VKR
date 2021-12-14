const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const authRouter = require('./authRouter')

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
// app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1", 
    port: '3306',
    user: 'root',
    database: "vkr",
});

db.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password], (err, result) => {
            console.log(err);
    })
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password], 
        (err, result) => {
            if (err)
                res.send({err: err});

            if (result.length > 0)
                res.send(result);
            else res.send({message: "Неверный логин или пароль!"})
    })
})

app.get('/users');

app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});

