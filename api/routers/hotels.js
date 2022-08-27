const express = require('express');
const { default: mongoose } = require('mongoose');
const {createHotel,deleteHotel,getHotel,getHotels,updateHotel} = require('../controllers/hotel')
const HotelSchema = require('../models/Hotel');
const { verifyAdmin } = require('../utilis/verifyToken');
const router = express.Router();
const Hotels = new mongoose.model("Hotel",HotelSchema)

//Create
router.post('/',verifyAdmin,createHotel);
//Update
router.put('/:id',verifyAdmin,updateHotel)
//Read
router.get('/',getHotel)
router.get('/',getHotels)

//Delete
router.delete('/:id',verifyAdmin,deleteHotel)

module.exports = router;