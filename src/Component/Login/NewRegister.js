import React from "react";
import logo from "../../Assests/img/logo-min.png";
import { motion } from "framer-motion";
import "../../Assests/css/Login.css";
import axios from "axios";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Store/Store";
const NewRegister = () => {
  const signupbtn = async () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (name.length === 0) {
      toast.error("Required Name !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else if (email.length === 0) {
      toast.error("Required Email !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else if (password.length === 0) {
      toast.error("Required Password !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      var data = {
        name: name,
        email: email,
        password: password,
      };
      var createaccount = await axios
        .post(`${process.env.REACT_APP_SERVER}/admin/create`, data)
        .then((res) => {
          return res.data;
        });
      if (createaccount !== null) {
        localStorage.setItem("userid", createaccount.data.userid);
        window.location.replace("/");
      }
    }
  };
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
                <label>Name</label>
                <input placeholder="John" id="name" />
              </div>
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
                <button onClick={signupbtn}>Sign Up</button>
              </center>
            </div>
            <p className="dont_have_acc">
              Already have an account ?{" "}
              <span className="click_here" onClick={newUserHander}>
                Click here to sign In
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

export default NewRegister;
