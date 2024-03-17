const mongoose=require('mongoose');


const ArtistSchema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    albums:[{
        type:mongoose.Schema.ObjectId,
        ref:"Album"
    }],
});


const Artist=mongoose.model("Artist",ArtistSchema)
module.exports=Artist;