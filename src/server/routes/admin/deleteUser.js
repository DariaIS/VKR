const bcrypt = require('bcrypt');

module.exports = function (app, db) {

    app.post("/deleteUser", async (req, res) => {

        const userName = req.body.userName;
        const password = req.body.password;

        const checkUserSame = () => {
            return new Promise((resolve, reject) => {
                if (req.session.user.userName.toUpperCase() === userName.toUpperCase())
                    return reject('Вы не можете удалить свою учетную запись!');
                return resolve(userName);
            })
        }

        const checkPassword = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT password FROM user WHERE user_name = ?",
                    [req.session.user.userName], async (err, result) => {
                        if (err) {
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (result.length !== 0) {
                            const comparison = await bcrypt.compare(password, result[0].password);
                            if (!comparison) {
                                return reject('Неверное имя пользователя или пароль!');
                            }
                        }

                        return resolve(result);
                    }
                );
            });
        }

        const checkUserExist = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT password FROM user WHERE user_name = ?",
                    [userName], async (err, result) => {
                        if (err) {
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (result.length === 0)
                            return reject('Неверное имя пользователя или пароль!');

                        return resolve(result);
                    }
                );
            });
        }

        const deleteUser = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "DELETE FROM user WHERE user_name = ?",
                    [userName], (err, result) => {
                        if (err) {
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        res.send({ message: 'Пользователь успешно удален!' });
                        return resolve(result);
                    }
                );
            });
        }

        async function userDeleting() {
            try {
                await checkUserSame();
                await checkPassword();
                await checkUserExist();
                await deleteUser();
            } catch (err) {
                res.send({ err: err });
            }
        }

        userDeleting();
    });
}