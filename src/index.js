require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { client } = require("./utils/dbClient");
const PORT = process.env.PORT || 5000;

// DB handler
client.connect((err) => {
  const { serviceRouter } = require("./routes/service.routes");
  const { adminRouter } = require("./routes/admin.routes");
  const { orderRouter } = require("./routes/order.routes");
  const { reviewRouter } = require("./routes/review.routes");

  serviceRouter(app);
  adminRouter(app);
  orderRouter(app);
  reviewRouter(app);
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("\nServer listening on Port:", PORT);
});
