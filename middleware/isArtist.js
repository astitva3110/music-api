const mongoose=require('mongoose');
const User=require('../model/user');
const connectdb=require('../util/database')

connectdb();

const isArtist=async(req,res,next)=>{
    const userId=req.params.user_id;
    const user=await User.findById(userId);

    if(user.isArtist===false){
        res.status(500).json({message:"User is not artist"});
    }
    next();
}
module.exports=isArtist;