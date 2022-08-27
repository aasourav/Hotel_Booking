const { default: mongoose } = require("mongoose")
const UserSchema = require("../models/User")
const bcrypt = require('bcryptjs')
const crtError = require('../utilis/error')
const jwt = require('jsonwebtoken')

const User = new mongoose.model("User",UserSchema)


const register = async(req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password , salt);


    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    })
    try{
        await newUser.save();
        res.status(200).send(`Congratulations!\n Hello ${req.body.username} `)
    }catch(err){
        next(err);
    }
}

const login = async(req,res,next)=>{
    try{
        const user =await User.findOne({username:req.body.username});
        if(!user) return next(crtError(404,"User Not found"))
        
        const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrectPass) return next(crtError(404,"Wrong Password"))

        //json web token;
        //for generate secrate in linux or windows
        // openssl rand -base64 32 
        // run this in your terminal

        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_secret);

        const {password,isAdmin, ...otherDetails} = user; 

        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).send({...otherDetails})
    }catch(err){
        next(err);
    }
}


module.exports = {
    register,
    login,
    User
}