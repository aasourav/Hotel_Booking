const { default: mongoose } = require("mongoose");
const RoomSchema = require("../models/Room");
const { Hotels } = require("./hotel");

const Room = mongoose.model("Room",RoomSchema)

const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save();
        //now we are gonna update our hotel
        try{
            await Hotels.findByIdAndUpdate(hotelId,{
                $push: {rooms:savedRoom._id},
            })
        }
        catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }
    catch(err){
        next(err)
    }
}
const updateRoom = async (req,res,next)=>{
        try{
           const updtRoom = await Room.findByIdAndUpdate(req.params.id,{
                $pull: {rooms:req.param.id}},
                {new:true}
            )
        res.status(200).json(updtRoom)
        }
        catch(err){
            next(err)
        }

}
const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    try{
        await Room.findByIdAndDelete(req.params.id);
        //now we are gonna update our hotel
        try{
            await Hotels.findByIdAndUpdate(hotelId,{
                $pull: {rooms:req.params.id},
            })
        }
        catch(err){
            next(err)
        }
        res.status(200).json("SUCCESS!!")
    }
    catch(err){
        next(err)
    }
}

const getRoom = async (req,res,next)=>{
    try{
       const room = await Room.findById(req.params.id)
       res.status(200).json(room)
    }
    catch(err){
        next(err)
    }
}
const getRooms = async (req,res,next)=>{
    try{
       const rooms = await Room.find()
       res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }

}

module.exports={
    getRoom,
    getRooms,
    createRoom,
    deleteRoom,
    updateRoom
}