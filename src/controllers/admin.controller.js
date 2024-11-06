const { adminsCollection } = require("../utils/dbCollections");

const addAdmin = (req, res) => {
  const admin = req.body;
  const email = admin.email;

  adminsCollection.insertOne(admin).then((result) => {
    res.send(result.insertedCount > 0);
  });
};

const findAdminByEmail = (req, res) => {
  const email = req.params.email;

  adminsCollection.find({ email }).toArray((err, docs) => {
    if (docs[0]) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};

module.exports = {
  addAdmin,
  findAdminByEmail,
};
