const jwt=require("jsonwebtoken")


const verify=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(404).json({message:"user is not Login"})
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,data)=>{
        if(err){
           return  res.status(500).json({message:"token is not matched"})
        }
        next()
    })
}

module.exports=verify;
