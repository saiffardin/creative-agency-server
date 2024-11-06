const URLS = {
  // adminRouter
  ADD_ADMIN: "/addAdmin",
  FIND_ADMIN_BY_EMAIL: "/findAdmin/:email",

  // orderRouter
  UPDATE_STATUS_BY_ID: "/updateStatus/:id",
  ADD_ORDER: "/addOrder",
  FIND_ORDERS_BY_EMAIL: "/findOrders/:email",
  LOAD_ALL_ORDERS: "/loadAllOrders",

  // reviewRouter
  ADD_REVIEW: "/addReview",
  LOAD_ALL_REVIEWS: "/loadAllReviews",

  // serviceRouter
  ADD_SERVICE: "/addService",
  LOAD_ALL: "/loadAll",
  FIND_SERVICE_BY_ID: "/findService/:service",
};

module.exports = { URLS };
