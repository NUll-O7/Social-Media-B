import React from "react";
import {Routes , Route} from "react-router-dom"
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useCurrentUser from "./hooks/useCurrentUser.jsx";
import { useSelector } from "react-redux";



function App() {
  useCurrentUser()
  const {userData} = useSelector(state=>state.user)

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={userData?<Home />:<SignIn/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
