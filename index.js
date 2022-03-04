const express = require("express");
const cors = require("cors");
const {connectDB} =  require("./src/config/dbContext");
const app = express();
require("dotenv").config();

connectDB();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.REACT_PORT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(cors());
app.use(express.static('public'));

app.use(express.json({ extented: false }));

// Define Route
app.use("/", require("./src/routes/index"));
app.use("/api", require("./src/routes/url"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
