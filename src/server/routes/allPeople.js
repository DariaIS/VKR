module.exports = function (app, db) {

    app.get('/allPeople', (req, res) => {
        db.query(
            "SELECT * FROM person INNER JOIN chair ON person.id_chair = chair.id_chair",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        if (elem.position === 'student')
                            elem.position = 'Студент';
                        else elem.position = 'Сотрудник';

                        elem.label = elem.last_name + ' ' + elem.name + ' ' + elem.middle_name + '. ' + elem.chair + '. ' + elem.position;
                        elem.value = elem.id_person;
                        delete elem.last_name;
                        delete elem.name;
                        delete elem.middle_name;
                        delete elem.position;
                        delete elem.chair;
                        delete elem.id_person;
                        delete elem.id_chair;
                    });
                    res.send({ result });
                }
            }
        );
    });
}