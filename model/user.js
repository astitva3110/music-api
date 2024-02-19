const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const joi=require('joi');

require('dotenv').config();

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    likedsong:[{
     type: mongoose.Schema.Types.ObjectId,
     ref:"Song"
    }],
    playlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Song"
       }]
});
const User = mongoose.model('User', userSchema);
const validate=(user)=>{
    const schema=joi.object({

        name:joi.string().min(5).max(10).required(),

    });
  return schema.validate(user);
}
module.exports = User;