const mongoose=require('mongoose');


const userschema=new mongoose.Schema({
name :{
    type:String,
    required:true
},

email:{
    type:String,
    required:true
},

password:{
    type:String,
    required:true
},
appname:{
    type:String,
    default:""
},
likedSong:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'likedSong'
}],

Playlist:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Playlist'
}],
isArtist:{
    type:Boolean,
    default:false
}
},{timestamps:true})


const User=mongoose.model('User',userschema)

module.exports=User;