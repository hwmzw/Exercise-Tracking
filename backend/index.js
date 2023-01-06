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

const userSchemas = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchemas);

app.post("/register", (req, res) => {
  const newUser = new User({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    password: req.body.pwd,
  });
  newUser.save((err)=>{
    if(!err){
        res.send("Registered Successfully")
    }
    else{
        res.send(err)
    }
  })
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
