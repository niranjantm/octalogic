import {useEffect, useState} from 'react';
import classes from "../styles/form2.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTypeOfWheels } from '../redux/bookingReducer';

function Form2() {

    const [type,setType] = useState({typeOfWheels:""});
    const [error,setError] = useState("")
    const [data,setData] = useState([]);
    
    const dispatch = useDispatch();
    
    
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setType({typeOfWheels:e.target.value});
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!type.typeOfWheels){
            setError("Please select a valid option !")
        }
        else{
           dispatch(updateTypeOfWheels(type))
           navigate(`/form3/${type.typeOfWheels}`);
            
        }
    }

    useEffect(()=>{
        async function fetchData(){
            const res = await axios.get("http://localhost:5000/api/get/typeOfWheels");
            
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
            Please select number of wheels
        </h3>
        <form className={classes.wheelsForm} onSubmit={handleSubmit}>
            
                {data.map((item)=>{
                    return(
                        <div className={classes.radioContainer} key={item}>
                        <label>
                    {item}:
                </label>
                <input type='radio' onChange={handleChange} name='car' value={item} checked={type.typeOfWheels===item} ></input>
                      </div>  
                    )
                })}
                
            <div className={classes.buttonContainer}>
                <button disabled={!type.typeOfWheels}>
                    Next
                </button>
            </div>
           
        </form>
        {error && <p>{error}</p>}
    </main>
  )
}

export default Form2