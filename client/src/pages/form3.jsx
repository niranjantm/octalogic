import {useEffect, useState} from 'react';
import classes from "../styles/form2.module.css";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateVehicleType } from '../redux/bookingReducer';

function Form2() {

    const [type,setType] = useState({vehicleType:""});
    const [error,setError] = useState("")
    const [data,setData] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    console.log(type)
   
    
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setType({vehicleType:e.target.value});
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!type.vehicleType){
            setError("Please select a valid option !")
        }
        else{
           dispatch(updateVehicleType(type));
          navigate(`/form4/${type.vehicleType}`)
            
        }
    }

    useEffect(()=>{
        async function fetchData(){
            const res = await axios.get(`http://localhost:5000/api/get/vehicleType/${params.typeOfWheel}`);
           
            if(!res.status ===200){
                setError("Server error")
            }
            else{
                setData(res.data);
            }
        }
        fetchData();
    },[])
  return (
    <main className={classes.main}>
        <h3>
            Please select type of vehicle
        </h3>
        <form className={classes.wheelsForm} onSubmit={handleSubmit}>
            
                {data.map((item)=>{
                    return(
                        <div className={classes.radioContainer} key={item}>
                        <label>
                    {item}:
                </label>
                <input type='radio' onChange={handleChange}  value={item} checked={type.vehicleType===item} ></input>
                      </div>  
                    )
                })}
                
            <div className={classes.buttonContainer}>
                <button disabled={!type.vehicleType}>
                    Next
                </button>
            </div>
           
        </form>
        {error && <p>{error}</p>}
    </main>
  )
}

export default Form2