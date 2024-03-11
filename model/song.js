const mongoose=require('mongoose');

const songSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    album:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Album"
    }],
    artist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Artist",
    }],
    song:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
})
const Song=mongoose.model("song",songSchema);

module.exports=Song;