const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref :"user",
    },
    problem:[
        {
            problem_id:{
                type:Number,
                unique:true,
            },
            submission:[{
                solution_id:{
                    type:Number,
                }
                ,solution:{
                    type:String
                },
                Acceptance:{
                    type:String
                }
            }]
        }
    ]


})


const SUBMISSIONS = mongoose.model("submission",SubmissionSchema);
module.exports = SUBMISSIONS;
