import express from "express";
import Booking from "../models/booking.model.js";


const router  = express.Router();

router.post("/api/create/booking",async (req,res,next)=>{
    const {firstName,lastName,typeOfWheels,vehicleType,vehicleName,bookingDate} = req.body;

    
    
})

router.get("/api/get/booking", async (req,res,next)=>{
    res.json("ok")
})


export default router;