import express from "express";
import sequelize from "./db/init.js";
import cors from "cors";
import bookingRouter from "./routes/booking.routes.js"


const app = express();

app.use(express.json());
app.use(cors());


app.use(bookingRouter)

app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500; 
    let message = err.message || "Internal server error"; 

    
    return res.status(statusCode).json({
        success: false, 
        errorMessage: message,
        statusCode,
    });
});

async function start(){
    try{
        await sequelize.sync();
        console.log("Connected to the database")

        app.listen(5000,()=>{
            console.log("Server live on port 5000")
        })
    }
    catch(error){
        console.log(error);
    }
}
start()

