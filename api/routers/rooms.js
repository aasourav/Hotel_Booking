const express = require('express');
const { createRoom,deleteRoom,updateRoom,getRoom,getRooms } = require('../controllers/room');
const { verifyAdmin } = require('../utilis/verifyToken');
const router = express.Router();

//Create
router.post('/:hotelId',verifyAdmin,createRoom);
//Update
router.put('/:id',verifyAdmin,updateRoom)
//Read
router.get('/',getRoom)
router.get('/',getRooms)

//Delete
router.delete('/:id/:hotelId',verifyAdmin,deleteRoom)

module.exports = router;