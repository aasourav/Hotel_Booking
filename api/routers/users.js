const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hello , this is User");
})
module.exports = router;