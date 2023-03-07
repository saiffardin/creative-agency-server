// temp
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(fileUpload());

const {client} = require('./utils/dbClient')
const port = 5000;

// DB handler
client.connect(err => {
    const {addService, loadAllServices, getServiceByTitle} = require('./controllers/services.controller');
    const {addAdmin, findAdminByEmail} = require("./controllers/admin.controller");
    const {addOrder, updateOrderStatusById, findOrdersByEmail, loadAllOrders} = require("./controllers/orders.controller");
    const {addReview, loadAllReviews} = require("./controllers/reviews.controller");

    // SERVICES 
    app.post('/addService', addService);
    app.get('/loadAll', loadAllServices);
    app.get('/findService/:service', getServiceByTitle)

    // ADMIN
    app.post('/addAdmin', addAdmin)
    app.get('/findAdmin/:email', findAdminByEmail)

    // ORDER
    app.patch('/updateStatus/:id', updateOrderStatusById)
    app.post('/addOrder', addOrder)
    app.get('/findOrders/:email', findOrdersByEmail)
    app.get('/loadAllOrders', loadAllOrders)

    // REVIEW 
    app.post('/addReview', addReview)
    app.get('/loadAllReviews', loadAllReviews)
})

app.listen(process.env.PORT || port);