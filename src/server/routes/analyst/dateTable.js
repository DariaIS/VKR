module.exports = function (app, db) {
    
    app.post('/dateTable', (req, res) => {
        const date = req.body.date;
        // console.log(date)
    
        db.query(
            "SELECT * FROM arriving_date INNER JOIN date ON date.id_date INNER JOIN car ON car.id_car WHERE arriving_date.id_date=date.id_date AND arriving_date.id_car=car.id_car AND date.date=?",
            [date],
            (err, result) => {
                // console.log(result)
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                    });
                    res.send({ result });
                }
            }
        );
    });
}