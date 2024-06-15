import  { useState } from 'react'
import classes from "../styles/form1.module.css"
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import { updateUserName } from '../redux/bookingReducer';
import { useNavigate } from 'react-router-dom';

function Form1() {

    const [formData,setFormData] = useState({firstName:"",lastName:""});
    const [error,setError] = useState("");

    const booking = useSelector(state=>state.booking);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleChange = (e)=>{
        setError("")
        setFormData({...formData,[e.target.name]:e.target.value})
    }   

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!formData.firstName || !formData.lastName){
            setError("All fields are required!")
        }
        else{
           
            const res = await axios.post("http://localhost:5000/api/create/user",formData);
            if(res.status===400){
                setError("Server error")
            }
            else{
           
            dispatch(updateUserName({...formData,["userId"]:res.data.id}));
                setFormData({firstName:"",lastName:""})
                 navigate("/form2")
            }
            
        }
    }

    return (
        <main className={classes.main}>
            
            <h3 className={classes.intro}>
                Please enter the required information.
            </h3>
            <form className={classes.nameForm} onSubmit={handleSubmit}>
                <div className={classes.nameContainer}>
                    <label>
                        Enter your first name
                    </label>
                    <input type='text' required name="firstName" value={formData.firstName} onChange={handleChange} />


                </div>
                <div className={classes.nameContainer}>
                    <label>
                        Enter your last name
                    </label>
                    <input type='text' required name="lastName" onChange={handleChange} value={formData.lastName} />

                </div>
                
                <div className={classes.nameContainer}>
                    <button>Next</button>
                </div>
                {error && <p className={classes.error}>{error}</p>}
            </form>
        </main>
    )
}

export default Form1