import { createSlice} from "@reduxjs/toolkit";

const initialState = {firstName:"",lastName:"",typeOfWheels:"",vehicleType:"",vehicleName:"",vehicleId:"",userId:"",startDate:"",endDate:""};


const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        updateUserName:(state,action)=>{

            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userId = action.payload.userId
        },
        updateTypeOfWheels:(state,action)=>{
            state.typeOfWheels = action.payload.typeOfWheels
        },
        updateVehicleType:(state,action)=>{
            state.vehicleType = action.payload.vehicleType
        },
        updateVehicleName:(state,action)=>{
            state.vehicleName = action.payload.vehicleName;
            state.vehicleId = action.payload.vehicleId;
        },
        updateBookingDates:(state,action)=>{
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate
        }
    

    }
})

export const{updateUserName,updateTypeOfWheels,updateVehicleName,updateVehicleType,updateBookingDates} = bookingSlice.actions;
export default bookingSlice.reducer;