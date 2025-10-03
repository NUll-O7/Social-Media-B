import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({ 
    name: "user",
    initialState:{
        userData : null,
        profileData:null,
    },

    reducers:{
        setUserData:(state , action)=>{
            state.userData = action.payload
        },
        // clearUser:(state , action)=>{
        //     state.userData= null
        // }

          setProfileData:(state , action)=>{
            state.profileData = action.payload
        },

         setSuggestedUsers:(state,action)=>{
        state.suggestedUsers=action.payload
       },


    }
 })  

 export const {setUserData , setProfileData , setSuggestedUsers} = userSlice.actions
 export default userSlice.reducer 

