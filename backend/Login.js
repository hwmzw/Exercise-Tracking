const express = require('express')
const bodyParser=require('body-parser')
const mongoose = require('mongoose')

const app=express();
const port=8081;
const connection= "mongodb://localhost:27017/Tasks";
mongoose.connect(connection);

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//creating schema

const loginSchema= mongoose.Schema({
    email:{type: String, require:true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
    password: {type: String, required: true }
})

const User = mongoose.model('User', loginSchema)

//sending to database

app.post('/login',(req,res)=>{
    const login = new User({
    email: req.body.email,
    password: req.body.password,
    })


User.findOne({email, password}, (err, User)=>{
    if(!err){
       res.send("User found successfully")
    }else{
       res.send(err)
    }
})
const token = jwt.sign({ email:User.email }, process.env.JWT_SECRET);
    res.send({ token });
});
app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
})
