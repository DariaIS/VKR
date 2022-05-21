const loginRoutes = require('./authorize/login');
const logoutRoutes = require('./authorize/logout');

const allCarPlatesRoutes = require('./allCarPlates');
const allPeopleRoutes = require('./allPeople');

const addCarRoutes = require('./admin/addCar');
const addUserRoutes = require('./admin/addUser');
const expiredCarsRoutes = require('./admin/expiredCars');
const changeCarDataRoutes = require('./admin/changeCarData');
const deleteUserRoutes = require('./admin/deleteUser');

const inOutCarRoutes = require('./security/inOutCar');
const inOutLogRoutes = require('./security/inOutLog');
const notExpCarPlatesRoutes = require('./security/notExpCarPlates');

const byDateRoutes = require('./analyst/byDate');
const allCarsRoutes = require('./analyst/allCars');
const byPlateRoutes = require('./analyst/byPlate');
const byPersonRoutes = require('./analyst/byPerson');
const byNowRoutes = require('./analyst/byNow');

module.exports = function(app, db) {
    loginRoutes(app, db);
    logoutRoutes(app);

    allCarPlatesRoutes(app, db);
    allPeopleRoutes(app, db);
    
    addCarRoutes(app, db);
    addUserRoutes(app, db);
    expiredCarsRoutes(app, db);
    changeCarDataRoutes(app, db);
    deleteUserRoutes(app, db);
    
    inOutCarRoutes(app, db);
    inOutLogRoutes(app);
    notExpCarPlatesRoutes(app, db);

    byDateRoutes(app, db);
    allCarsRoutes(app, db);
    byPlateRoutes(app, db);
    byPersonRoutes(app, db);
    byNowRoutes(app, db);
}