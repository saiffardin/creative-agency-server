const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const fileUpload = require('express-fileUpload');
const fs = require('fs-extra');

// -------------------------------------------
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('services'));
app.use(fileUpload());

const port = 5000;
// -------------------------------------------

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.opwzi.mongodb.net:27017,cluster0-shard-00-01.opwzi.mongodb.net:27017,cluster0-shard-00-02.opwzi.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-t6aucd-shard-0&authSource=admin&retryWrites=true&w=majority`;


// -------------------------------------------

app.get('/', (req, res) => {
    res.send("hello from db. It's working fine");
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


// DB handler
client.connect(err => {
    const servicesCollection = client.db("creativeAgency").collection("services");
    const adminsCollection = client.db("creativeAgency").collection("admins");

    // add a service
    app.post('/addService', (req, res) => {
        const img = req.files.img;
        const title = req.body.title;
        const description = req.body.description;

        const filePath = `${__dirname}/services/${img.name}`;

        // console.log(); console.log(title); console.log(description); console.log(img);

        img.mv(filePath, err => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: 'Failed to upload service image' });
            }

            const newImg = fs.readFileSync(filePath);
            const encImg = newImg.toString('base64');

            let image = {
                contentType: img.mimetype,
                size: img.size,
                imgType: Buffer.from(encImg, 'base64')
            };

            servicesCollection.insertOne({ title, description, img: image })
                .then(result => {
                    fs.remove(filePath, error => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({ msg: 'Failed to upload service image' });

                        }


                        console.log();
                        console.log('data inserted into service - successfully');
                        // res.send(result.insertedCount > 0);
                        res.send({ name: img.name, path: `/${img.name}` });

                    })
                })


        });

    })


    // load all services
    app.get('/loadAll', (req, res) => {
        servicesCollection.find({})
            .toArray((err, docs) => {
                // console.log(docs);
                res.send(docs);
            })

    })


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



        // res.send(admin);
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

    // client.close();
})



// -------------------------------------------
app.listen(process.env.PORT || port);