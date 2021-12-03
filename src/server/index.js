const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/', function (req, res) {
//     res.render('index', {});
// });

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

    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result) => {
        console.log(err);
    })
});

app.listen(3001, () => {
    console.log("running server");
});

