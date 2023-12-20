const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


const QUESTIONSchema  = new Schema({
    problem_id:{
        type:Number,
        unique:true,
        require:true
    },
    Title:{
        type:String,
        require:true
    },
    Acceptance:{
        type:String
    },
    Difficulty: {
        type:String
    },
    description:{
        type:String
    },
    Examples: [{
        type:{
            id:{
                type:Number,
                require:true,
                unique:true
            },
            Input:{
                type:String
            },
            Output:{
                type:String
            }
        }

     }],
     Constraints:{
        type:String
     }


    });

const QUESTIONS = mongoose.model("question",QUESTIONSchema);
module.exports = QUESTIONS;


