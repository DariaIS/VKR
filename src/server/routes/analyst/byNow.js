module.exports = function (app, db) {
    
    app.get('/byNow', (req, res) => {
    
        db.query(
            "SELECT license_plate, region, car_brand, arrival_time FROM car INNER JOIN `date`, arriving_date WHERE `date`.`date` = CURDATE() AND `date`.`id_date` = arriving_date.id_date AND arriving_date.id_car = car.id_car AND departure_time IS NULL",
            (err, result) => {
                // console.log(result)
                if (err) {
                    res.send({ err: err });
                    throw err;
                }
                else {
                    result.forEach(elem => {
                        elem.id = elem.license_plate + ' ' + elem.region;
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                    });
                    res.send({ result });
                }
            }
        );
    });
}