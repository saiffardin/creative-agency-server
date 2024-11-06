const { reviewsCollection } = require("../utils/dbCollections");

const addReview = (req, res) => {
  const review = req.body;

  reviewsCollection.insertOne(review).then((result) => {
    res.send(result.insertedCount > 0);
  });
};

const loadAllReviews = (req, res) => {
  reviewsCollection.find({}).toArray((err, docs) => {
    res.send(docs);
  });
};

module.exports = {
  addReview,
  loadAllReviews,
};
