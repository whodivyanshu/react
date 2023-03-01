const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const md5 = require("md5");
const  bodyparser = require("body-parser");
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/UserbaseDB");

const User = mongoose.model('User', {
    name: String,
    pass: String
});

const user = new User();
user.save();

app.get("/", function(req,res){
    res.render("index");
    
});

app.post("/", function (req,res){
    const username = req.body.username;
    const password = md5(req.body.password);
    user.name = username;
    user.pass = password;
    User.findOne({username: username}).then((err ,foundUser)=>{
        if(foundUser){
            console.log(foundUser.password);
            console.log(password);
        }
        else{
            console.log(err);
        }
    })
    
})



// function(err,foundUser){
//     if(err){
//         console.log(err);
//     }
//     else{
//         if(foundUser){
//             console.log(foundUser.password);
//             console.log(password);
//         }
//     }
// }

app.listen(2000, function(){
    console.log("server started on port 3000");
})