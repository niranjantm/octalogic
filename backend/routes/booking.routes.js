import express from "express";
import Booking from "../models/booking.model.js";
import Vehicle from "../models/vehicle.model.js";
import errorHandler from "../utils/errorHandler.js";
import { Sequelize } from "sequelize";
import User from "../models/user.model.js";
import { Op } from 'sequelize';


const router  = express.Router();

router.post("/api/create/booking",async (req,res,next)=>{
    const {firstName,lastName,typeOfWheels,vehicleType,vehicleName,startDate,endDate,vehicleId,userId} = req.body;

    try{
        const booking = await Booking.create({userId,vehicleId,startDate:new Date(startDate),endDate:new Date(endDate)})
        res.status(201).json({success:true})
    }catch(error){
        next(errorHandler(400,error.message))
    }
    
})



router.get("/api/get/typeOfWheels", async(req,res,next)=>{
    try{
        const typeOfWheels = await Vehicle.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('typeOfWheels')), 'typeOfWheels']
            ]
        })

        const typeOfWheelsArray = typeOfWheels.map((item)=>{
            return item.dataValues.typeOfWheels
        })


        res.status(200).json(typeOfWheelsArray);
    }catch(error){
        next(errorHandler(400,error.message))
    }

})

router.get("/api/get/vehicleType/:data", async (req,res,next)=>{

    const {typeOfWheels} = req.body
   const {data} = req.params
   console.log(data);
    try{
        const vehicleType = await Vehicle.findAll({
            attributes:["vehicleType"],
          where:{typeOfWheels:data}
        })

        const vehicleTypeArray = vehicleType.map((item)=>{
            return item.dataValues.vehicleType
        })
        res.status(200).json(vehicleTypeArray);
    }
    catch(error){
        next(errorHandler(400,error.message))
    }
})/
router.get("/api/get/vehicleName/:data", async (req,res,next)=>{

   
   const {data} = req.params
   
    try{
        const vehicleName = await Vehicle.findAll({
          where:{vehicleType:data}
        })
        console.log(vehicleName);
        const vehicleNameArray = vehicleName.map((item)=>{
            return item.dataValues
        })
        res.status(200).json(vehicleNameArray);
    }
    catch(error){
        next(errorHandler(400,error.message))
    }
})

router.get("/api/get/booking/:vehicleId", async (req,res,next)=>{
    const {vehicleId} = req.params;
    try{
        const unavailableDates  = await Booking.findAll({
            where: {
                vehicleId: vehicleId,
                endDate: {
                  [Op.gte]: new Date(),
                },
              },
              order: [['startDate', 'DESC']],
              limit:1, 
            });
        console.log(unavailableDates);
           res.status(200).json(unavailableDates);
        }catch(error){
            next(errorHandler(400,error.message))
        }
    })





router.post("/api/create/user", async (req,res,next)=>{
    const{firstName,lastName} = req.body;

    try{
        const user = await User.create({firstName,lastName});

        res.status(201).json(user);


    }catch(error){
        next(errorHandler(400,error.message))
    }
})

router.post("/api/checkoverlap/:vehicleId",async (req,res,next)=>{
    const {vehicleId} = req.params;
    const {startDate,endDate} = req.body;
    console.log(startDate)

    try{
        const overlappingBooking = await Booking.findOne({
            where: {
              vehicleId:vehicleId,
              startDate: {
                [Op.lte]: endDate,
              },
              endDate: {
                [Op.gte]: startDate,
              },
            },
          });
          console.log(overlappingBooking);
          if(overlappingBooking){
            return res.status(200).json({ error: 'Selected dates overlap with an existing booking' });
          }
          else{
            res.status(200).json("ok");
          }
    }
    catch(error){
        next(errorHandler(400,error.message))
    }
})

export default router;