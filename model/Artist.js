const mongoose=require('mongoose');


const ArtistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    songName:{
        type:String
    },
    albums:[{
        type:mongoose.Schema.ObjectId,
        ref:"Album"
    }],
    imageUrl:{
       type:String,
       required:true
    } ,
    audioUrl:{
        type:String,
    }

});


const Artist=mongoose.model("Artist",ArtistSchema)
module.exports=Artist;