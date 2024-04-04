const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3001;
require("dotenv").config();

const route = require("./routes");

const db = require("./config/db");
db.connect();

const morgan = require("morgan");

app.use(morgan("combined"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//router init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
