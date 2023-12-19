const mongoose = require('mongoose');

async function connectToMongoDb(req,res){

    try{
        await mongoose.connect('mongodb://localhost:27017/leetcode_clone');
        console.log('connected DB');

    }
    catch(err)
    {
        console.log(err);

    }

}


module.exports = connectToMongoDb;


