const { URLS } = require("../constants/urls");
const {
  addAdmin,
  findAdminByEmail,
} = require("../controllers/admin.controller");

const adminRouter = (app) => {
  app.post(URLS.ADD_ADMIN, addAdmin);
  app.get(URLS.FIND_ADMIN_BY_EMAIL, findAdminByEmail);
};

module.exports = { adminRouter };
