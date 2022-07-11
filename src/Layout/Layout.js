import React, { useEffect, useState } from "react";
import LoginPage from "../Pages/LoginPage";
import Router from "../Router/Router";
import Sidebar from "../Component/Sidebar/Sidebar";
import "../Assests/css/layout.css";

const Layout = () => {
  const [userid, setuserid] = useState(null);
  useEffect(() => {
    var userid = localStorage.getItem("userid");
    setuserid(userid);
  }, []);
  return (
    <div>
      {userid === null ? (
        <LoginPage />
      ) : (
        <div className="layout-div">
          {userid !== null ? (
            <div>
              <Sidebar />
            </div>
          ) : null}
          <div className="layout_page">
            <Router />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
