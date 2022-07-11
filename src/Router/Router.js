import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Users from "../Pages/Users";
import Category from "../Pages/Category";
import Order from "../Pages/Order";
import Menu from "../Pages/Menu";
// home
import Swiper from "../Component/Home/Swiper_Head";
import Food_card from "../Component/Home/Food_card";
import Welcome_to_balken from "../Component/Home/Welcome_to_balken";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/Users" element={<Users />} />
        <Route exact path="/Category" element={<Category />} />
        <Route exact path="/Order" element={<Order />} />
        <Route exact path="/Menu" element={<Menu />} />
        {/* home */}
        <Route exact path="/Swiper" element={<Swiper />} />
        <Route exact path="/Foodcard" element={<Food_card />} />
        <Route exact path="/welcome_balken" element={<Welcome_to_balken />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
