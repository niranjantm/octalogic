import {useEffect, useState} from 'react';
import classes from "../styles/form2.module.css";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { updateVehicleName } from '../redux/bookingReducer';

function Form4() {

    const [type,setType] = useState({vehicleName:"",index:null});
    const [error,setError] = useState("")
    const [data,setData] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
   
    console.log(type)
    const navigate = useNavigate();

    const handleChange =(e)=>{
        
        setType({vehicleName:e.target.value,index:e.target.id});
        
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!type.vehicleName){
            setError("Please select a valid option !")
        }
        else{
           
          dispatch(updateVehicleName({vehicleName:type.vehicleName,vehicleId:Number(type.index)}))
          navigate("/form5")
            
        }
    }

    useEffect(()=>{
        async function fetchData(){
            const res = await axios.get(`http://localhost:5000/api/get/vehicleName/${params.vehicleType}`);
           
            if(!res.status ===200){
                setError("Server error")
            }
            else{
                // let vehicleName = res.data.map(item=>{
                //     return item.vehicleName
                // })
                setData(res.data)
            }
        }
        fetchData();
    },[])
  return (
    <main className={classes.main}>
        <h3>
            Please select the vehicle
        </h3>
        <form className={classes.wheelsForm} onSubmit={handleSubmit}>
            
                {data.map((item,index)=>{
                    return(
                        <div className={classes.radioContainer} key={item.vehicleName}>
                        <label>
                    {item.vehicleName}:
                </label>
                <input type='radio' onChange={handleChange} id={item.id} value={item.vehicleName} checked={type.vehicleName===item.vehicleName} ></input>
                      </div>  
                    )
                })}
                
            <div className={classes.buttonContainer}>
                <button disabled={!type.vehicleName}>
                    Next
                </button>
            </div>
           
        </form>
        {error && <p>{error}</p>}
    </main>
  )
}

export default Form4