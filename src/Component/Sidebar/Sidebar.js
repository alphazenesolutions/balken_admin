import React, { useState } from "react";
import "../../Assests/css/sidebar.css";
import logo from "../../Assests/img/logo.png";
import logos from "../../Assests/img/logos.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";
import SwipeVerticalIcon from "@mui/icons-material/SwipeVertical";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import GradeIcon from "@mui/icons-material/Grade";
import CollectionsIcon from "@mui/icons-material/Collections";
import StyleIcon from "@mui/icons-material/Style";
import PostAddIcon from "@mui/icons-material/PostAdd";
const Sidebar = () => {
  const [isbigbar, setisbigbar] = useState(true);
  const changeBar = () => {
    setisbigbar(!isbigbar);
  };
  const logoutbtn = () => {
    // eslint-disable-next-line no-restricted-globals
    var alertdata = confirm("Are You Sure Logout..");
    if (alertdata === true) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.replace("/");
    }
  };
  // Dynamic_home
  const [isHome, setisHome] = useState(false);

  const homeHandler = () => {
    setisHome(true);
  };
  const homeHandler_out = () => {
    setisHome(false);
  };
  return (
    <div className="Sidebar_container">
      <div className={`${isbigbar ? "sidebar-div" : "small-sidebar-div"}`}>
        <div className="logo-div">
          <div className="Sidebar_container">
            <center>
              {isbigbar ? (
                <img
                  onClick={changeBar}
                  style={{ cursor: "pointer" }}
                  className="logoimg"
                  width={150}
                  src={logo}
                  alt=""
                />
              ) : (
                <img
                  onClick={changeBar}
                  style={{ cursor: "pointer" }}
                  className="logosimg"
                  width={50}
                  src={logo}
                  alt=""
                />
              )}
            </center>
          </div>

          <ul>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/"
              >
                <DashboardOutlinedIcon className="iconspan" />
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">
                    Dashboard
                  </span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a className="navlinkli" activeClassName="activenavlink">
                <HomeIcon className="iconspan" />
                {isbigbar ? (
                  <span
                    onClick={homeHandler}
                    className="spanname animate__backInLeft"
                  >
                    Home
                  </span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/blog"
              >
                <PostAddIcon className="iconspan" />
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Blogs</span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/Category"
              >
                <CategoryOutlinedIcon className="iconspan" />
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Category</span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/tags"
              >
                <StyleIcon className="iconspan" />
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Tags</span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/Menu"
              >
                <span className="iconspan">
                  <BiFoodMenu />
                </span>
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Menu</span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/Order"
              >
                <span className="iconspan">
                  <AiOutlineBorderlessTable />
                </span>
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Orders</span>
                ) : null}
              </a>
            </li>
            <li>
              <span id="border"></span>
              <a
                className="navlinkli"
                activeClassName="activenavlink"
                exact
                href="/Users"
              >
                <InsertEmoticonOutlinedIcon className="iconspan" />
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Users</span>
                ) : null}
              </a>
            </li>
            <li className="logOut" onClick={logoutbtn}>
              <span id="border"></span>
              <a
                className="navlinkli "
                activeClassName="activenavlink"
                exact
                href="/dashboard"
              >
                <LoginOutlinedIcon className="iconspan" />
                {isbigbar ? (
                  <span className="spanname animate__backInLeft">Log out</span>
                ) : null}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isbigbar && isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={`${
            isHome ? "sidebar-home-div" : "small-sidebar-home-div"
          }`}
          onMouseLeave={homeHandler_out}
        >
          <div className="logo-div">
            <div className="Sidebar_container">
              <center>
                {isbigbar ? (
                  <img
                    onClick={changeBar}
                    style={{ cursor: "pointer" }}
                    className="logoHimg"
                    width={150}
                    src={logo}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={changeBar}
                    style={{ cursor: "pointer" }}
                    className="logosHimg"
                    width={50}
                    src={logo}
                    alt=""
                  />
                )}
              </center>
            </div>

            <ul>
              <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/Swiper"
                >
                  <SwipeVerticalIcon className="iconspan_H" />
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Swiper
                    </span>
                  ) : null}
                </a>
              </li>
              <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/Foodcard"
                >
                  <MenuBookIcon className="iconspan_H" />
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Food Card
                    </span>
                  ) : null}
                </a>
              </li>
              <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/welcome_balken"
                >
                  <OutdoorGrillIcon className="iconspan_H" />
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Art of cooking
                    </span>
                  ) : null}
                </a>
              </li>
              <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/tdyspcl"
                >
                  <span className="iconspan_H">
                    <GradeIcon />
                  </span>
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Today's Special
                    </span>
                  ) : null}
                </a>
              </li>
              <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/homemenu"
                >
                  <span className="iconspan_H">
                    <RestaurantMenuIcon />
                  </span>
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Menus
                    </span>
                  ) : null}
                </a>
              </li>
              <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/specialday"
                >
                  <HourglassTopIcon className="iconspan_H" />
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Special day
                    </span>
                  ) : null}
                </a>
              </li>
              {/* <li>
                <span id="border"></span>
                <a
                  className="navlinkli_H"
                  activeClassName="activenavlink"
                  exact
                  href="/Users"
                >
                  <CollectionsIcon className="iconspan_H" />
                  {isbigbar ? (
                    <span className="spanname_H animate__backInLeft">
                      Gallery
                    </span>
                  ) : null}
                </a>
              </li> */}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
