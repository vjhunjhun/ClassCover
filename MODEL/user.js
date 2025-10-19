const { types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    image:{
        filename:String,
        url:{
            type:String,
            default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
            set:(v)=>v=="https://plus.unsplash.com/premium_photo-1661942126259-fb08e7cce1e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"?"":v, 
        }
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);
