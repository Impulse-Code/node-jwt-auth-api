const mongoose = require('mongoose');
const Joi = require('joi');
const jwt =require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:50
    },
    
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1024
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,admin:this.isAdmin},process.env.TOKEN_SECRET);
    return token;
};

const User= mongoose.model('User',userSchema);

function validateUser(user) {
    const schema=Joi.object({
        username:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).email().required(),
        password:Joi.string().min(6).max(50).required(),
    });
    return schema.validate(user);
}




module.exports.User=User;
module.exports.validateUser = validateUser;