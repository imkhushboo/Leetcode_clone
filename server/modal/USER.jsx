const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
    },
    name:{
        type:String,
    },
    gender:{
        type:String
    },
    birthday:{
        type:Date
    },
    location:{
        type:String
    },
    image:{
        type:String
    }

});

const USERS = mongoose.model("user",UserSchema);
module.exports = USERS;
