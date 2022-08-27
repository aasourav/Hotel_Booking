const jwt = require('jsonwebtoken')
const crtError = require('../utilis/error')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(crtError(401,"You are not Authenticated!"))
    }

    jwt.verify(token,process.env.JWT_secret,(err,user)=>{
        if(err) return next(crtError(403,"token is not valid!"))
        req.user = user;
        // console.log(user)
        next(); 
    })
}
const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return next(crtError(403,"User is not valid!"))
        }
    })
}
const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        // console.log(req.user.email)
        if(req.user.isAdmin === true){
            next();
        }
        else{
            return next(crtError(403,"User is not valid!"))
        }
    })
}
module.exports ={
    verifyToken,
    verifyUser,
    verifyAdmin
}