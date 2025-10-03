import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers, setUserData } from '../redux/userSlice'
import { getSuggestions } from '../apiCalls/authCalls'

function getSuggestedUsers() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchUser=async ()=>{
    try {
        const result=await getSuggestions()
         dispatch(setSuggestedUsers(result))
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
  },[userData])
}

export default getSuggestedUsers
