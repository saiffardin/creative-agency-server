const { URLS } = require("../constants/urls");
const {
  addReview,
  loadAllReviews,
} = require("../controllers/reviews.controller");

const reviewRouter = (app) => {
  app.post(URLS.ADD_REVIEW, addReview);
  app.get(URLS.LOAD_ALL_REVIEWS, loadAllReviews);
};

module.exports = { reviewRouter };
