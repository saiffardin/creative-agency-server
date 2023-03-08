const ObjectID = require('mongodb').ObjectID;

const {ordersCollection} = require('../utils/dbCollections');

const addOrder = (req, res) => {
    const order = req.body;
    // console.log(order);

    ordersCollection.insertOne(order)
        .then(result => {
            // console.log('mongoDB:', result);
            res.send(result.insertedCount > 0);
        })
}

const updateOrderStatusById = (req, res) => {
    // console.log(req.body);
    // console.log("id:",req.params.id);

    ordersCollection.updateOne(
        {_id: ObjectID(req.params.id)},
        {
            $set: {
                status: req.body.status,
            }
        }
    )
        .then(result => {
            // console.log(result.modifiedCount>0);
            res.send(result.modifiedCount > 0);
        })
}

const findOrdersByEmail = (req, res) => {
    const email = req.params.email;
    let clientOrders = [];
    // console.log("find email:",email);

    ordersCollection.find({email})
        .toArray((err, docs) => {
            console.log();

            docs.forEach(doc => {
                clientOrders.push(doc.service);
            })
            console.log(clientOrders);
            res.send(clientOrders);
        })
}

const loadAllOrders = (req, res) => {
    ordersCollection.find({})
        .toArray((err, docs) => {
            // console.log(docs);
            res.send(docs);
        })

}

module.exports = {
    addOrder,
    updateOrderStatusById,
    findOrdersByEmail,
    loadAllOrders
}