const { URLS } = require("../constants/urls");
const {
  addService,
  loadAllServices,
  getServiceByTitle,
} = require("../controllers/services.controller");

const serviceRouter = (app) => {
  app.post(URLS.ADD_SERVICE, addService);
  app.get(URLS.LOAD_ALL, loadAllServices);
  app.get(URLS.FIND_SERVICE_BY_ID, getServiceByTitle);
};

module.exports = { serviceRouter };
