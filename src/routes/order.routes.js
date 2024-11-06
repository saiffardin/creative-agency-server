const { URLS } = require("../constants/urls");
const {
  addOrder,
  updateOrderStatusById,
  findOrdersByEmail,
  loadAllOrders,
} = require("../controllers/orders.controller");

const orderRouter = (app) => {
  app.patch(URLS.UPDATE_STATUS_BY_ID, updateOrderStatusById);
  app.post(URLS.ADD_ORDER, addOrder);
  app.get(URLS.FIND_ORDERS_BY_EMAIL, findOrdersByEmail);
  app.get(URLS.LOAD_ALL_ORDERS, loadAllOrders);
};

module.exports = { orderRouter };
