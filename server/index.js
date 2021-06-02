const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// DB set
const connect = mongoose
  .connect("mongodb+srv://root:1234@cluster0.qqgwt.mongodb.net/todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));


// route 
app.use('/todo', require('./routes/items'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});