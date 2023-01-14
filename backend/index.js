const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/Tasks");

const server = express();
server.use(express.urlencoded());
server.use(express.json());
server.use(cors({ origin: "*" }));

//signup api

server.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .send({ status: false, message: "Please submit all required fields!" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .send({
        status: false,
        message: "Password should be at least 8 characters!",
      });
  }
  if (!validateEmail(email)) {
    return res
      .status(400)
      .send({ status: false, message: "Please enter valid email" });
  }
  let user = await User.create({ firstName, lastName, email, password });
  res.send({ status: true, message: "User created successfully!", user });
  // const token = jwt.sign({ email: user.email, password: user.password }, { expiresIn: '1h' });
  // res.send({status: true, message: "User created successfully!", User, token});
});

//login api

server.post("/login", async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      res.send({ status: true, message: "Login Successfully", user, token });
    } else {
      res.status(401).json({ auth: false, message: "Invalid credentials." });
    }
  });
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
server.listen(8081);
