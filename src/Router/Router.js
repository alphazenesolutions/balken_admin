import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Users from "../Pages/Users";
import Category from "../Pages/Category";
import Order from "../Pages/Order";
import Menu from "../Pages/Menu";
import Tags from "../Pages/Tags";

// home
import Swiper from "../Component/Home/Swiper_Head";
import Food_card from "../Component/Home/Food_card";
import Welcome_to_balken from "../Component/Home/Welcome_to_balken";
import Tdy_spcl from "../Component/Home/Tdy_spcl";
import Special_day from "../Component/Home/Special_day";
import Home_menu from "../Component/Home/Home_menu";
import Blog from "../Pages/Blog";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/Users" element={<Users />} />
        <Route exact path="/Category" element={<Category />} />
        <Route exact path="/Order" element={<Order />} />
        <Route exact path="/Menu" element={<Menu />} />
        <Route exact path="/tags" element={<Tags />} />
        <Route exact path="/blog" element={<Blog />} />

        {/* home */}
        <Route exact path="/Swiper" element={<Swiper />} />
        <Route exact path="/Foodcard" element={<Food_card />} />
        <Route exact path="/welcome_balken" element={<Welcome_to_balken />} />
        <Route exact path="/tdyspcl" element={<Tdy_spcl />} />
        <Route exact path="/specialday" element={<Special_day />} />
        <Route exact path="/homemenu" element={<Home_menu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
