const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const port = 8081;

mongoose.connect("mongodb://localhost:27017/Tasks");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//creating schemas

const userSchemas = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
},
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchemas);

//saving to database
app.post("/register", (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (!err) {
      res.send("Registered Successfully");
    } else {
      res.send(err);
    }
  });
});

//hashing password

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
