const mongoose=require('mongoose');


const Albumschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    song:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song",
        default:[]
    }],
    text:{
        type:String,
       required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
       },

},{timestamps:true})

const Album=mongoose.model('Album',Albumschema);

module.exports=Album;