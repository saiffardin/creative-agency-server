require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const {client} = require('./utils/dbClient')
const port = 5000;


// DB handler
client.connect(err => {
    const {serviceRouter} = require('./routes/service.routes');
    const {adminRouter} = require('./routes/admin.routes');
    const {orderRouter} = require('./routes/order.routes');
    const {reviewRouter} = require('./routes/review.routes');

    serviceRouter(app);
    adminRouter(app);
    orderRouter(app)
    reviewRouter(app)

})

app.listen(process.env.PORT || port);