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