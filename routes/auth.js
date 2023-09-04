const router = require('express').Router();
const {User,validateUser} = require('../models/User');
const bcrypt = require('bcrypt');
const Joi=require('joi');
// REGISTER FUCNTIONALITY
router.post('/register',async (req,res,next)=>{
    try{
    const {error}= validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
      
    const emailExist =await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
        
    const user= new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    });

   
        const newUser = await user.save();
        const {password,...others} =newUser._doc
        res.status(200).json(others);
    }
    catch(err){
       next(err); 
    }
});

// LOGIN FUNCTIONALITY
router.post('/login',async (req,res,next)=>{
    try{
    const {error}= validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
    
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('invalid email or password');

        const validPass = await bcrypt.compare(req.body.password,user.password)
        if(!validPass) return res.status(400).send('Invalid email or password');

        const token = user.generateAuthToken();
        const {password,...others} = user._doc;

        res.header('x-auth-token', token).status(200).json(others);

    }
    catch(error) {
        next(error);
    }

      
});

function validateLogin(req) {
    const schema=Joi.object({
        // username:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).email().required(),
        password:Joi.string().min(6).max(50).required(),
    });
    return schema.validate(req);
}


module.exports =router;