import React, { useState } from 'react'
import classes from "../styles/form1.module.css"

function Form1() {

    const [formData,setFormData] = useState({firstName:"",lastName:""});
    const [error,setError] = useState("");

    const handleChange = (e)=>{
        setError("")
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!formData.firstName || !formData.lastName){
            setError("All fields are required!")
        }
        else{
            console.log(formData);
            setFormData({firstName:"",lastName:""})
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