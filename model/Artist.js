const mongoose=require('mongoose');


const ArtistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    songName:{
        type:String
    },
    // albums:[{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"Album"
    // }],
    imageUrl:{
       type:String,
       required:true
    } ,
    audioUrl:{
        type:String,
        // required:true
    }

});

ArtistSchema.methods.addAlbum=function(album) {
    this.albums.push(album);
    return this.save();
};

const Artist=mongoose.model("Artist",ArtistSchema)
module.exports=Artist;