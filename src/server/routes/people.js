module.exports = function (app, db) {

    app.get('/people', (req, res) => {
        db.query(
            "SELECT * FROM person",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        if (elem.position === 'student')
                            elem.position = '. Студент';
                        else elem.position = '. Сотрудник';

                        elem.label = elem.last_name + ' ' + elem.name + ' ' + elem.middle_name + '. Кафедра - ' + elem.chair + ' ' + elem.position;
                        elem.value = elem.id_person;
                        delete elem.last_name;
                        delete elem.name;
                        delete elem.middle_name;
                        delete elem.position;
                        delete elem.chair;
                        delete elem.id_person;
                    });
                    res.send({ result });
                }
            }
        );
    });
}