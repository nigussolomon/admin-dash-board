import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/auth/login";
import AdminLoginScreen from "../pages/auth/adminLogin";
import Home from "../pages/home/home";
import Form from "../pages/form/form";
import OtpScreen from "../pages/auth/otp";
import Protected from '../services/auth'
import AdminProtected from '../services/adminAuth'



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/admin" element={<AdminLoginScreen />} />
      <Route path="/otp" element={<OtpScreen />} />
      <Route path="/home" element={<AdminProtected children={<Home/>}/>}></Route>
      <Route path="/form" element={<Protected children={<Form/>}/>}></Route>
    </Routes>
  );
}

export default AppRoutes;
