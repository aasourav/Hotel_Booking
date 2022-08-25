const { default: mongoose } = require('mongoose');
const HotelSchema = require('../models/Hotel');
const Hotels = new mongoose.model("Hotel",HotelSchema)


const createHotel = async(req,res,next)=>{
    const newHotel = new Hotels(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    }catch(error){
        // res.status(500).json(error)
        next(error)
    }
}

const updateHotel = async(req,res)=>{
    try{
        const savedHotel = await Hotels.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(savedHotel);
    }catch(error){
        // res.status(500).json(error)
        next(error)
    }
}

const findHotel = async(req,res)=>{
    try{
        // const savedHotel = await Hotels.findById(req.params.id)
        //find all
        const hotelS = await Hotels.find()
        // res.status(200).json(savedHotel);
        res.status(200).json(hotelS);

    }catch(error){
        // res.status(500).json(error)
        next(error)
    }
}

const deleteHotel = async(req,res,next)=>{
    try{
        const savedHotel = await Hotels.deleteOne({_id: req.params.id})
        res.status(200).json(savedHotel);

    }catch(error){
        next(error)
    }
}

module.exports = {
    createHotel,
    deleteHotel,
    findHotel,
    updateHotel
}