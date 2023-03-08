const {client} = require('./dbClient')

const servicesCollection = client.db("creativeAgency").collection("services");
const adminsCollection = client.db("creativeAgency").collection("admins");
const ordersCollection = client.db("creativeAgency").collection("orders");
const reviewsCollection = client.db("creativeAgency").collection("reviews");

module.exports = {
    servicesCollection,
    adminsCollection,
    ordersCollection,
    reviewsCollection
}
