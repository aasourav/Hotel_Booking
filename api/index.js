const express = require('express')
const env = require('dotenv');
const { default: mongoose } = require('mongoose');

const auth = require('./routers/auth');
const hotels = require('./routers/hotels');
const rooms = require('./routers/rooms');
const users = require('./routers/users');

const app = express()

env.config();

const connect = async()=>{
    try{
        await mongoose.connect(process.env.Mongo);
        console.log("connected to mongodb")
    }catch(error){
        throw error;
    }
}
mongoose.connection.on('disconnected',()=>{
    console.log("Mondodb Disconnected!");
})
mongoose.connection.on('connected',()=>{
    console.log("Mondodb Connected!");
})

app.use(express.json())
app.use('/auth',auth)
app.use('/users',users)
app.use('/hotels',hotels)
app.use('/rooms',rooms)

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMsg = err.message || "Something went wrong"
    return res.status(errStatus).json({
        success:false,
        // status :errorStatus,
        message: errMsg,
        stack: err.stack
    })
})
app.listen(3000,()=>{
    connect();
    console.log("connected to backend")
})
