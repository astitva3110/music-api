const mongoose=require('mongoose');

module.exports=(req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(res.params.id))
    return res.status(404).send({message:"invaild objectid"})
    next();
};