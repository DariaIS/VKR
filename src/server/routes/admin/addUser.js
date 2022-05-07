const bcrypt = require('bcrypt');

module.exports = function (app, db) {
    
    const saltRounds = 10;

    app.post("/addUser", async (req, res) => {
        if (req.body.userName === '' || req.body.password === '' || req.body.role === '')
            res.send({ message: 'Не все поля заполнены!' });
        else {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
            const userName = req.body.userName;
            const password = encryptedPassword;
            const role = req.body.role;
    
            let warning = false;
    
            // console.log("\n");
            // console.log(password);
    
            let CheckUser = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_user FROM user WHERE user_name=?",
                        [userName], (err, result) => {
                            if (result.length === 0) {
                                // console.log(result.length + " такого пользователя нет")
                            }
                            else {
                                // console.log(result.length + " такой пользователь есть");
                                res.send({ message: 'Введенное имя пользователя недоступно!' });
                                warning = true;
                            }
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                });
            }
    
            let AddUser = () => {
                return new Promise((resolve, reject) => {
                    // console.log("AddUser");
                    db.query(
                        "INSERT INTO user (user_name, password, role) VALUES (?, ?, ?)",
                        [userName, password, role], (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            res.send({ message: 'Пользователь успешно добавлен!' });
                            // console.log(result + " пользователь добавлен")
                            return resolve(result);
                        });
                });
            }
    
            async function UserAdding() {
    
                try {
                    await CheckUser();
                    if (!warning)
                        await AddUser();
                } catch (error) {
                    console.log(error)
                }
            }
    
            UserAdding();
        }
    });
}