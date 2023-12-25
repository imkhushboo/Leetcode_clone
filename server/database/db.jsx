const mongoose = require('mongoose');

async function connectToMongoDb(req,res){

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected DB');

    }
    catch(err)
    {
        console.log(err);

    }

}


module.exports = connectToMongoDb;


