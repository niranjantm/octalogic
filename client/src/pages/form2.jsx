import {useState} from 'react';
import classes from "../styles/form2.module.css";

function Form2() {

    const [type,setType] = useState({typeOfWheels:""});
    const [error,setError] = useState("")

    const handleChange =(e)=>{
        setType({typeOfWheels:e.target.value});
        
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!type.typeOfWheels){
            setError("Please select a valid option !")
        }
        else{
            console.log(type)
        }
    }
  return (
    <main className={classes.main}>
        <h3>
            Please select number of wheels
        </h3>
        <form className={classes.wheelsForm} onSubmit={handleSubmit}>
            <div className={classes.radioContainer}>
                <label>
                    Four wheels:
                </label>
                <input type='radio' onChange={handleChange} name='car' value="fourWheels" checked={type.typeOfWheels==="fourWheels"} ></input>
            </div>
            <div className={classes.radioContainer}>
                <label>
                    Two wheels:
                </label>
                <input type='radio' onChange={handleChange} name='bike' value="twoWheels" checked={type.typeOfWheels==="twoWheels"}></input>
            </div>
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