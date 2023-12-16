const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const BlogDetailSchema = new Schema({
    blog_id:{
        type:Number,
        require:true,
        unique:true
    },
    blog_detail:{
        type:Object
    }
})


const BlogSchema= new Schema({
    user_id:{
        type:Number,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    blog: 
    {
        type:[BlogDetailSchema],
        default:undefined
    }
});

const BLOGS = mongoose.model("blog",BlogSchema);
const BLOGS_DETAIL = mongoose.model("blog_details",BlogDetailSchema)
module.exports = {BLOGS,BLOGS_DETAIL};
