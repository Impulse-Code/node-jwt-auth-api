const jwt =require('jsonwebtoken');

 module.exports =function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied.No token Provided by the User');

    try{
        const verifiedToken= jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verifiedToken;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}
