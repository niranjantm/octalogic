import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from "../styles/conform.module.css"
import axios from 'axios';

function Conformation() {
const booking = useSelector(state=>state.booking)
const [error,setError] = useState("");
const [booked,setBooked] = useState(false)
console.log(booking);


const handleBooking = async()=>{
    const res  = await axios.post("http://localhost:5000/api/create/booking",booking)
    if(!res.data.success){
        setError("Server Error")
    }
    else{
        console.log(res.data)
        setBooked(true)
    }

}
  return (
    <main className={classes.main}>
    <h1>
        Please Conform your booking
    </h1>
       
            {
                <div>
                <p>User Name: {booking.firstName+" "+booking.lastName}</p>
                <p>Vehicle Name: {booking.vehicleName}</p>
                <p>Vehicle Type: {booking.vehicleType}</p>
                <p>Start Date: {booking.startDate}</p>
                <p>End Date: {booking.endDate}</p>
                </div>
            }
            <div className={classes.buttonContainer} >
                <button onClick={handleBooking} type='btn'>Conform Booking and Rent</button>
            </div>
            <div>
                {booked && <h2>Thank you ! Your vehicle is booked</h2>}
            </div>
            {error &&<p className={classes.error}>{error}</p>}

        
    </main>
  )
}

export default Conformation