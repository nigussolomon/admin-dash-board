import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/auth/login";
import Home from "../pages/home/home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default AppRoutes;
