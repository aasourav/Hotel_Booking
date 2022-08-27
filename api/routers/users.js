const express = require('express');
const {creatUser,deleteUser,getUser,getUsers,updateUser} = require('../controllers/user');
const {verifyToken,verifyUser, verifyAdmin} = require('../utilis/verifyToken');

const router = express.Router();



// //Create  
// router.post('/',creatUser);
// router.get('/chkAuth',verifyToken,(req,res,next)=>{
//     res.send(req.user)
// })

// //verify a user
// router.get('/chkuser/:id',verifyUser,(req,res,next)=>{
//     // res.send(req.user)
//     res.send('You Can update or delete your account')
// })
// //verify admin
// router.get('/chkadmin/:id',verifyAdmin,(req,res,next)=>{
//     // res.send(req.user)
//     res.send('You Are Admin')
// })
//Update
router.put('/:id',verifyUser,updateUser)
//Read
router.get('/:id',verifyUser,getUser)
router.get('/',verifyAdmin,getUsers)

//Delete
router.delete('/:id',verifyUser,deleteUser)

module.exports = router;