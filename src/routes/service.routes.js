const {addService, loadAllServices, getServiceByTitle} = require('../controllers/services.controller');

const serviceRouter = (app) => {
    app.post('/addService', addService);
    app.get('/loadAll', loadAllServices);
    app.get('/findService/:service', getServiceByTitle)
}

module.exports = {serviceRouter}