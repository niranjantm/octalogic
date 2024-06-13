import express from "express";
import sequelize from "./db/inti.js";
import cors from "cors";
import bookingRouter from "./routes/booking.routes.js"


const app = express();

app.use(express.json());
app.use(cors());


app.use(bookingRouter)


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

