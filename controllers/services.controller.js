const {client} = require('../utils/dbClient')
const {servicesCollection} = require('../utils/dbCollections')


const addService = (req, res) => {
    const img = req.files.img;
    const title = req.body.title;
    const description = req.body.description;


    const newImg = req.files.img.data;
    const encImg = newImg.toString('base64');

    let image = {
        contentType: img.mimetype,
        size: img.size,
        imgType: Buffer.from(encImg, 'base64')
    };

    servicesCollection.insertOne({title, description, img: image})
        .then(result => {

            console.log();
            console.log('data inserted into service - successfully');
            res.send(result.insertedCount > 0);

        })

}

const loadAllServices = (req, res) => {
    servicesCollection.find({})
        .toArray((err, docs) => {
            // console.log(docs);
            res.send(docs);
        })

}

const getServiceByTitle = (req, res) => {

    const title = req.params.service;

    console.log('title:', title)

    servicesCollection.find({title})
        .toArray((err, docs) => {
            console.log(docs);
            res.send(docs[0]);
        })
}


module.exports = {
    addService,
    loadAllServices,
    getServiceByTitle
}