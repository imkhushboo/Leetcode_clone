const mongoose=require('mongoose');
const Schema = mongoose.Schema;



const BlogSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: "user",
        default: null,
    },
    email:{
        type:String,
        unique:true
    },
    blogs:[
    {
       type:{
        blog_id:{
            type:Number,
            unique:true,
            require:true
        },
        blog_detail:{
            type:Object
        }
       },
       default:[]
    }
]
});

const BLOGS = mongoose.model("blog",BlogSchema);
module.exports = {BLOGS};
