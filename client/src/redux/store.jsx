import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./bookingReducer"

const store = configureStore({
    reducer:{
        booking:bookingReducer,
    }
})

export default store;