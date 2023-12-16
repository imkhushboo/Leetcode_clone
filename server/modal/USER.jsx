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
    }
});

const USERS = mongoose.model("user",UserSchema);
module.exports = USERS;
