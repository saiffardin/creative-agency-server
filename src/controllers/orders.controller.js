const ObjectID = require("mongodb").ObjectID;

const { ordersCollection } = require("../utils/dbCollections");

const addOrder = (req, res) => {
  const order = req.body;

  ordersCollection.insertOne(order).then((result) => {
    res.send(result.insertedCount > 0);
  });
};

const updateOrderStatusById = (req, res) => {
  ordersCollection
    .updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          status: req.body.status,
        },
      }
    )
    .then((result) => {
      res.send(result.modifiedCount > 0);
    });
};

const findOrdersByEmail = (req, res) => {
  const email = req.params.email;
  let clientOrders = [];

  ordersCollection.find({ email }).toArray((err, docs) => {
    docs.forEach((doc) => {
      clientOrders.push(doc.service);
    });

    res.send(clientOrders);
  });
};

const loadAllOrders = (req, res) => {
  ordersCollection.find({}).toArray((err, docs) => {
    res.send(docs);
  });
};

module.exports = {
  addOrder,
  updateOrderStatusById,
  findOrdersByEmail,
  loadAllOrders,
};
