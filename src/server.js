const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1", 
    port: '3306',
    user: 'root',
    database: "vkr",
});

// db.connect(function (err) {
//     if (err) {
//         return console.error("Ошибка: " + err.message);
//     }
//     else {
//         console.log("Подключение к серверу MySQL успешно установлено");
//     }
// });

app.listen(3001, () => {
    console.log("running server");
});

