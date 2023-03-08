const {adminsCollection} = require('../utils/dbCollections')

const addAdmin = (req, res) => {
    const admin = req.body;
    const email = admin.email;

    console.log();
    console.log('new admin:', email);

    adminsCollection.insertOne(admin)
        .then(result => {
            // console.log('mongoDB:', result);
            res.send(result.insertedCount > 0);
        })
}

const findAdminByEmail = (req, res) => {
    const email = req.params.email;
    // console.log("find email:",email);

    adminsCollection.find({email})
        .toArray((err, docs) => {
            console.log();
            console.log(docs[0]);
            if (docs[0]) {
                console.log(true);
                res.send(true);

            }
            else {
                console.log(false);
                res.send(false);

            }
        })
}

module.exports = {
    addAdmin,
    findAdminByEmail
}