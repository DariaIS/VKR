const loginRoutes = require('./authorize/login');
const logoutRoutes = require('./authorize/logout');

const peopleRoutes = require('./people');

const addCarRoutes = require('./admin/addCar');
const addUserRoutes = require('./admin/addUser');
const changeDataRoutes = require('./admin/changeData');
const expiredCarsRoutes = require('./admin/expiredCars');
const allCarPlatesRoutes = require('./admin/allCarPlates');

const inOutCarRoutes = require('./security/inOutCar');
const inOutLogRoutes = require('./security/inOutLog');
const notExpCarPlatesRoutes = require('./security/notExpCarPlates');

const dateTableRoutes = require('./analyst/dateTable');
const carTableRoutes = require('./analyst/carTable');

module.exports = function(app, db) {
    loginRoutes(app, db);
    logoutRoutes(app);

    peopleRoutes(app, db);
    
    addCarRoutes(app, db);
    addUserRoutes(app, db);
    changeDataRoutes(app, db);
    expiredCarsRoutes(app, db);
    allCarPlatesRoutes(app, db);
    
    inOutCarRoutes(app, db);
    inOutLogRoutes(app);
    notExpCarPlatesRoutes(app, db);

    dateTableRoutes(app, db);
    carTableRoutes(app, db);
}