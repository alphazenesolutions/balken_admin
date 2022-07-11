import React from "react";
import { useSelector } from "react-redux";
import Login from "../Component/Login/Login";
import NewRegister from "../Component/Login/NewRegister";

const LoginPage = () => {
  const newUser = useSelector((store) => store.newUser);

  return (
    <div>
      {!newUser && <Login />}
      {newUser && <NewRegister />}
    </div>
  );
};

export default LoginPage;
