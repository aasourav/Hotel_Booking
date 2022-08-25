const express = require('express');
const { default: mongoose } = require('mongoose');
const {createHotel,deleteHotel,findHotel,updateHotel} = require('../controllers/hotel')
const HotelSchema = require('../models/Hotel');
const router = express.Router();
const Hotels = new mongoose.model("Hotel",HotelSchema)


//Create
router.post('/',createHotel);
//Update
router.put('/:id',updateHotel)
//Read
router.get('/',findHotel)
//Delete
router.delete('/:id',deleteHotel)

module.exports = router;