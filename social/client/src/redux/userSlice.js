import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({ 
    name: "user",
    initialState:{
        userData : null
    },

    reducers:{
        setUserData:(state , action)=>{
            state.userData = action.payload
        },
        // clearUser:(state , action)=>{
        //     state.userData= null
        // }
    }
 })  

 export const {setUserData} = userSlice.actions
 export default userSlice.reducer 

