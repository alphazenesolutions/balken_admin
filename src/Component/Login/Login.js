import React from "react";
import "../../Assests/css/Login.css";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../Assests/img/logo-min.png";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Store/Store";
const Login = () => {
  const loginbtn = async () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var data = {
      email: email,
      password: password,
    };
    if (!email) {
      toast.error("Required Email !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else if (!password) {
      toast.error("Required Password  !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      var user = await axios
        .post(`${process.env.REACT_APP_SERVER}/admin/login`, data)
        .then((res) => {
          return res.data;
        });
      if (!user.data) {
        toast.error(user.message, {
          autoClose: 2000,
          transition: Slide,
        });
      } else {
        localStorage.setItem("userid", user.data.user.userid);
        localStorage.setItem("token", user.data.token);
        toast.success("Welcome To Balken Admin", {
          autoClose: 2000,
          transition: Slide,
        });
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
    }
  };
  // newUser Handler
  const dispatch = useDispatch();
  const newUserHander = () => {
    dispatch(loginAction.newUserHandler());
  };
  return (
    <div className="Login">
      <div className="Login_container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="login_left"
        >
          <div className="Login_left_content">
            <div className="Login_left_head">
              <img src={logo} alt="Balken" />
              <center>{/* <h1>Sign in</h1> */}</center>
            </div>

            <div className="Login_inputs">
              <div className="inputs_container">
                <label>E-mail</label>
                <input placeholder="admin@gmail.com" id="email" />
              </div>
              <div className="inputs_container">
                <label>Password</label>
                <input placeholder="●●●●●" id="password" />
              </div>
              <div className="Forget_password">
                <div className="Rember_me">
                  <input type="checkbox" />
                  <p>Rember me</p>
                </div>
                <p>Forget password</p>
              </div>
              <center>
                <button onClick={loginbtn}>Sign in</button>
              </center>
            </div>
            <p className="dont_have_acc">
              Don't have an account ?{" "}
              <span className="click_here" onClick={newUserHander}>
                {" "}
                Click here to sign up
              </span>
            </p>
          </div>
        </motion.div>
        <div className="login_right"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
