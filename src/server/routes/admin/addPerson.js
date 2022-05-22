module.exports = function (app, db) {

    app.post("/addPerson", (req, res) => {
        let name = req.body.name;
        let lastName = req.body.lastName;
        const middleName = req.body.middleName;
        const idChair = req.body.idChair;
        const position = req.body.position;

        const checkPersonExist = () => {
            console.log('checkPersonExist');
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM person WHERE last_name = ? AND name = ? AND middle_name = ? AND position = ? AND id_chair = ?",
                    [lastName, name, middleName, position, idChair], (err, result) => {
                        console.log(result)
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (result.length !== 0) {
                            return reject('Данный человек уже есть в базе данных!');
                        }
                        return resolve(result);
                    });
            });
        }

        const addPerson = () => {
            console.log('addPerson');
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO person (last_name, name, middle_name, position, id_chair) VALUES (?, ?, ?, ?, ?)",
                    [lastName, name, middleName, position, idChair], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        console.log(result);
                        res.send({ message: 'Запись успешно добавлена!' });
                        return resolve(result);
                    });
            });
        }

        async function personAdding() {

            try {
                await checkPersonExist();
                await addPerson();

            } catch (err) {
                res.send({ err: err });
            }
        }

        personAdding();
    });
}