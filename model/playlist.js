const mongoose=require('mongoose');
const joi=require('joi');

const ObjectId=mongoose.Schema.Types.ObjectId;

const playlistSchema=new mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String},
    tracks:[{type:mongoose.Schema.Types.ObjectId, ref:"Track",default:[]}],
    artist:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Artist"
    }],
    img:{type:String}
})

playlistSchema.methods.addtrack=function(track){
    this.track.push(track);
    return this.save();
}
const playlist=mongoose.model("playlist",playlistSchema);

module.export=playlist;