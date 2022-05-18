const bcrypt = require('bcrypt');

module.exports = function (app, db) {

    app.post("/addUser", async (req, res) => {
        const saltRounds = 10;

        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
        const userName = req.body.userName;
        const password = encryptedPassword;
        const role = req.body.role;

        let warning = false;

        const checkUser = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_user FROM user WHERE user_name=?",
                    [userName], (err, result) => {
                        if (err) {
                            res.send({ err: 'Не удалось добавить запись!' });
                            return reject(err);
                        }

                        if (result.length !== 0) {
                            // console.log(result.length + " такой пользователь есть");
                            res.send({ err: 'Введенное имя пользователя недоступно!' });
                            warning = true;
                        }
                        return resolve(result);
                    }
                );
            });
        }

        const addUser = () => {
            return new Promise((resolve, reject) => {
                // console.log("AddUser");
                db.query(
                    "INSERT INTO user (user_name, password, role) VALUES (?, ?, ?)",
                    [userName, password, role], (err, result) => {
                        if (err) {
                            res.send({ err: 'Не удалось добавить запись!' });
                            return reject(err);
                        }
                        res.send({ message: 'Пользователь успешно добавлен!' });
                        // console.log(result + " пользователь добавлен")
                        return resolve(result);
                    }
                );
            });
        }

        async function userAdding() {
            try {
                await checkUser();
                if (!warning)
                    await addUser();
            } catch (error) {
                console.log(error)
            }
        }

        userAdding();
    });
}