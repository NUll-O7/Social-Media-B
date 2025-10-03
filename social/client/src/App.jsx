import React from "react";
import {Routes , Route} from "react-router-dom"
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useCurrentUser from "./hooks/useCurrentUser.jsx";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Upload from "./pages/Upload.jsx";
import useAllPosts from "./hooks/useAllPosts.jsx";
import getSuggestedUsers from "./hooks/getSuggestedUsers.jsx";



function App() {
  useCurrentUser()
  useAllPosts()
  getSuggestedUsers()
  const {userData} = useSelector(state=>state.user)

  return (
    <Routes>
   <Route path='/' element={!userData?<Landing/>:<Navigate to='/home'/> }/>
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to='/home'/>}/>
        <Route path='/signin' element={!userData?<SignIn/>:<Navigate to='/home'/>}/>
        <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to='/home'/>}/>
        <Route path='/home' element={userData?<Home/>:<Navigate to='/signin'/>}/>
        <Route path='/profile/:userName' element={<Profile/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/>
         <Route path='/upload' element={<Upload/>}/>
    </Routes>
  );
}

export default App;
