const {addReview, loadAllReviews} = require('../controllers/reviews.controller');

const reviewRouter = (app) => {
    app.post('/addReview', addReview)
    app.get('/loadAllReviews', loadAllReviews)
}

module.exports = {reviewRouter}

