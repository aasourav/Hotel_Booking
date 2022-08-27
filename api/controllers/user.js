const { default: mongoose } = require('mongoose');
const UserSchema = require('../models/Hotel');
const { User } = require('./auth');



const updateUser = async(req,res,next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser);
    }catch(error){
        // res.status(500).json(error)
        next(error)
    }
}
const getUser = async(req,res,next)=>{
    try{
        const getuser = await User.findById(req.params.id)
        // res.status(200).json(savedHotel);
        res.status(200).json(getuser);

    }catch(error){
        // res.status(500).json(error)
        next(error)
    }
}
const getUsers = async(req,res,next)=>{
    try{
        // const savedHotel = await Hotels.findById(req.params.id)
        //find all
        const user = await User.find()
        // res.status(200).json(savedHotel);
        res.status(200).json(user);

    }catch(error){
        // res.status(500).json(error)
        next(error)
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        const deleted = await User.deleteOne({_id: req.params.id})
        res.status(200).json(deleted);

    }catch(error){
        next(error)
    }
}

module.exports = {
    deleteUser,
    getUser,
    getUsers,
    updateUser
}