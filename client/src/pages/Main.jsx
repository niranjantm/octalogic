import React from 'react'
import classes from "../styles/main.module.css"
import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <>
     <main className={classes.main}>
        <nav className={classes.mainNav}>
        <h1 className={classes.intro}>Welcome to WheelsOnRent</h1>
        </nav>
    </main>
    <Outlet></Outlet>
    </>
   

  )
}

export default Main