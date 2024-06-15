import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import classes from "../styles/form2.module.css"
import axios from 'axios';
import { updateBookingDates } from '../redux/bookingReducer';
import { useNavigate } from 'react-router-dom';

function Form5() {

    const booking = useSelector(state=>state.booking);
    const [unavailableDate,setUnavailableDate] = useState([])
    const [dates,setDates] = useState({startDate:null,endDate:null})
    const [error,setError] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

   


    const handleChange =(e)=>{
        setError("")
       setDates({...dates,[e.target.name]:e.target.value});
       console.log(dates.startDate)
       console.log(dates.endDate);
       
        
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
       
        if(!dates.startDate || !dates.endDate || new Date(dates.startDate)<new Date() || new Date(dates.endDate)<new Date() ||new Date(dates.endDate)<new Date(dates.startDate) ){
            setError("Please select correct the dates")
        }else{

            const res  = await axios.post(`http://localhost:5000/api/checkoverlap/${booking.vehicleId}`,{startDate:dates.startDate,endDate:dates.endDate})
            if(res.data.error){
                setError(res.data.error)
            }
            else{
                dispatch(updateBookingDates(dates));
                navigate("/conformation")
            }
    
              
            }
        }
       
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const unavailableDates = await axios.get(`http://localhost:5000/api/get/booking/${booking.vehicleId}`)
            if(unavailableDates.status===400){
                setError("Server error");
            }else{
                
                    
                   setUnavailableDate(unavailableDates.data)
                    
                }
        }
        fetchData();
    },[booking.vehicleId])
  return (
    <main className={classes.main}>
   <h3>
   Please select the booking date
   </h3>
    <form className={classes.wheelsForm} onSubmit={handleSubmit}>
        
            {/* //{data.map((item)=>{ */}
            {/* //     return(
            //         <div className={classes.radioContainer} key={item}>
            //         <label>
            //     {item}:
            // </label>
            // <input type='radio' onChange={handleChange}  value={item} checked={type.vehicleName===item} ></input>
            //       </div>  
            //     ) */}
            {/* // })} */}
           <div className={classes.dateContainer}>
                <div>
                    <label>
                        Start Date
                    </label>
                    <input type='date' onChange={handleChange} name="startDate"></input>
                </div>
                <div>
                    <label>
                        End Date
                    </label>
                    <input type='date' onChange={handleChange}  name="endDate"></input>
                </div>
           </div>
           <div>
            {unavailableDate.map(item=>{
                return(
                    
                    <h4 key={item}>
                {`This vehicle is not available between ${item.startDate.split("T")[0]} to ${item.endDate.split("T")[0]}`}
            </h4>

                )
            })}
            
           </div>
            
        <div className={classes.buttonContainer}>
            <button >
                Next
            </button>
        </div>
       
    </form>
    {error && <p className={classes.error}>{error}</p>}
</main>
  )
}

export default Form5