import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/auth/login";
import Block from "../pages/auth/trainingBlock";
import Success from "../pages/auth/trainingSuccess";
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
      <Route path="/otp" element={<OtpScreen />} />
      <Route path="/blocked" element={<Block />} />
      <Route path="/done" element={<Success />} />
      <Route path="/home" element={<AdminProtected children={<Home/>}/>}></Route>
      <Route path="/form" element={<Protected children={<Form/>}/>}></Route>
    </Routes>
  );
}

export default AppRoutes;
