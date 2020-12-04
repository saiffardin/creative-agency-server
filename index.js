const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const fileUpload = require('express-fileupload');
const fs = require('fs-extra');

// -------------------------------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(fileUpload());

const port = 5000;
// -------------------------------------------

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.opwzi.mongodb.net:27017,cluster0-shard-00-01.opwzi.mongodb.net:27017,cluster0-shard-00-02.opwzi.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-t6aucd-shard-0&authSource=admin&retryWrites=true&w=majority`;


// -------------------------------------------

app.get('/', (req, res) => {
    res.send("saif");
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


// DB handler
client.connect(err => {
    const servicesCollection = client.db("creativeAgency").collection("services");
    const adminsCollection = client.db("creativeAgency").collection("admins");
    const ordersCollection = client.db("creativeAgency").collection("orders");
    const reviewsCollection = client.db("creativeAgency").collection("reviews");


    // --------------------------------------------------------------------- SERVICES - start

    // add a service
    app.post('/addService', (req, res) => {
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

        servicesCollection.insertOne({ title, description, img: image })
            .then(result => {

                console.log();
                console.log('data inserted into service - successfully');
                res.send(result.insertedCount > 0);

            })


        // });

    })


    // load all services
    app.get('/loadAll', (req, res) => {
        servicesCollection.find({})
            .toArray((err, docs) => {
                // console.log(docs);
                res.send(docs);
            })

    })


    // srch single service
    app.get('/findService/:service', (req, res) => {

        const title = req.params.service;

        console.log('title:', title)

        servicesCollection.find({ title })
            .toArray((err, docs) => {
                console.log(docs);
                res.send(docs[0]);
            })
    })

    // --------------------------------------------------------------------- SERVICES - end




    // --------------------------------------------------------------------- ADMIN - starts

    // add an admin
    app.post('/addAdmin', (req, res) => {
        const admin = req.body;
        const email = admin.email;

        console.log();
        console.log('new admin:', email);

        adminsCollection.insertOne(admin)
            .then(result => {
                // console.log('mongoDB:', result);
                res.send(result.insertedCount > 0);
            })
    })


    // search admin
    app.get('/findAdmin/:email', (req, res) => {
        const email = req.params.email;
        // console.log("find email:",email);

        adminsCollection.find({ email })
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
    })


    // --------------------------------------------------------------------- ADMIN - ends



    // --------------------------------------------------------------------- ORDER - starts

    // add an order from client
    app.post('/addOrder', (req, res) => {
        const order = req.body;
        // console.log(order);

        ordersCollection.insertOne(order)
            .then(result => {
                // console.log('mongoDB:', result);
                res.send(result.insertedCount > 0);
            })
    })


    // srch all orders of a client
    app.get('/findOrders/:email', (req, res) => {
        const email = req.params.email;
        let clientOrders = [];
        // console.log("find email:",email);

        ordersCollection.find({ email })
            .toArray((err, docs) => {
                console.log();

                docs.forEach(doc => {
                    clientOrders.push(doc.service);
                })
                console.log(clientOrders);
                res.send(clientOrders);
            })
    })


    // load all ordersCollection
    app.get('/loadAllOrders', (req, res) => {
        ordersCollection.find({})
            .toArray((err, docs) => {
                // console.log(docs);
                res.send(docs);
            })

    })


    // --------------------------------------------------------------------- ORDER - ends



    // --------------------------------------------------------------------- REVIEW - starts

    // add review 
    app.post('/addReview', (req, res) => {
        const review = req.body;
        // res.send(review);
        // const email = admin.email;

        console.log();
        console.log('review:', review);

        reviewsCollection.insertOne(review)
            .then(result => {
                // console.log('mongoDB:', result);
                res.send(result.insertedCount > 0);
            })
    })


    // load all reviews
    app.get('/loadAllReviews', (req, res) => {
        reviewsCollection.find({})
            .toArray((err, docs) => {
                // console.log(docs);
                res.send(docs);
            })

    })


    // --------------------------------------------------------------------- REVIEW - ends



    // client.close();
})



// -------------------------------------------
app.listen(process.env.PORT || port);