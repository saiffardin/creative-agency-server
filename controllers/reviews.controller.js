const {reviewsCollection} = require('../utils/dbCollections');

const addReview =  (req, res) => {
    const review = req.body;
    // res.send(review);
    // const email = admin.email;

    console.log('review:', review);

    reviewsCollection.insertOne(review)
        .then(result => {
            // console.log('mongoDB:', result);
            res.send(result.insertedCount > 0);
        })
}

const loadAllReviews = (req, res) => {
    reviewsCollection.find({})
        .toArray((err, docs) => {
            // console.log(docs);
            res.send(docs);
        })

}


module.exports = {
    addReview,
    loadAllReviews
}
