import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import testing from "../../Assests/img/Food1.jpg";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../../Assests/img/logo.png";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home_menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categorydata, setcategorydata] = React.useState([]);
  const [selecteddata, setselecteddata] = React.useState([]);
  const [selecteddataid, setselecteddataid] = React.useState(null);
  const [categoryfood, setcategoryfood] = React.useState([]);
  const [selectecategoryaid, setselectecategoryaid] = React.useState(null);
  // add Category
  const addCategory = () => {
    handleOpen();
    setTimeout(() => {
      if (selecteddata.length !== 0) {
        for (var i = 0; i < selecteddata.length; i++) {
          document.getElementById(`${selecteddata[i]}`).classList.add("selectedclass");
          document.getElementById(`${selecteddata[i]}`).checked = true
        }
      }
    }, 1000)
  };
  useEffect(() => {
    getcatgorydata()
  }, [])
  const getcatgorydata = async () => {
    var allcategorydata = await axios
      .get(`${process.env.REACT_APP_SERVER}/category/viewall`)
      .then((res) => {
        return res.data;
      });
    setcategorydata(allcategorydata);
  }
  const getdata = async (e) => {
    var data = document.getElementById(e.target.id).classList.contains("selectedclass");
    if (data === true) {
      document.getElementById(e.target.id).classList.remove("selectedclass");
    } else {
      document.getElementById(e.target.id).classList.add("selectedclass");
    }
  }
  const addbtn = async () => {
    var facilitystyle = document.getElementsByClassName("selectedclass");
    var checkedValue = [];
    for (var i = 0; facilitystyle[i]; ++i) {
      checkedValue.push(facilitystyle[i].value);
    }
    var data = {
      item: checkedValue.toString()
    }
    var createmenu = await axios.post(`${process.env.REACT_APP_SERVER}/homemenu/create`, data).then((res) => { return res.data })
    if (createmenu !== null) {
      window.location.reload()
    }
  }
  useEffect(() => {
    getmenudata()
  }, [])
  const getmenudata = async () => {
    var alldata = await axios.get(`${process.env.REACT_APP_SERVER}/homemenu/viewall`).then((res) => { return res.data })
    if (alldata.length !== 0) {
      setselecteddata(alldata[0].item.split(","))
      setselecteddataid(alldata[0].id)
    }
  }
  const updatebtn = async () => {
    var facilitystyle = document.getElementsByClassName("selectedclass");
    var checkedValue = [];
    for (var i = 0; facilitystyle[i]; ++i) {
      checkedValue.push(facilitystyle[i].value);
    }
    var data = {
      item: checkedValue.toString(),
      id: selecteddataid
    }
    var createmenu = await axios.post(`${process.env.REACT_APP_SERVER}/homemenu/update`, data).then((res) => { return res.data })
    if (createmenu !== null) {
      window.location.reload()
    }
  }
  const getcategory = async (e) => {
    var allmenu = await axios
      .get(`${process.env.REACT_APP_SERVER}/menu/viewall`)
      .then((res) => {
        return res.data;
      });
    var categoryfood = await allmenu.filter((data) => { return data.category === e.target.value })
    setcategoryfood(categoryfood.slice(0, 6));
    setselectecategoryaid(e.target.value)
  }
  return (
    <div>
      <div className="home_menu_add">
        <h1>Menu</h1>
        <div>
          <Avatar onClick={addCategory} className="Category_add_avatar">
            <AddIcon className="Category_add_icon" />
          </Avatar>
        </div>{" "}
      </div>
      <div className="home_menu_results">
        <center>
          <div className="OurmenuHomeActions">
            {selecteddata.length !== 0 ? selecteddata.map((data) => (
              selectecategoryaid === data ?
                <button
                  className="OurmenuHomeActionsActive"
                  style={{ cursor: "pointer" }}
                  value={data}
                  onClick={getcategory}
                >
                  {data}
                </button> : 
                <button
                  // className="OurmenuHomeActionsActive"
                  style={{ cursor: "pointer" }}
                  value={data}
                  onClick={getcategory}
                >
                  {data}
                </button>
            )) : null}
          </div>
        </center>

        <div className="OurmenuHomeDishes">
          <div className="OurmenuHomeDishesLeft">
            {categoryfood.length !== 0 ? categoryfood.map((data, index) => (
              <div className="MenuDishCards" key={index}>
                <img src={data.foodimg} alt="" />
                <div className="MenuDishCardContent">
                  <div className="MenuDishCardHead">
                    <h1>{data.foodname}</h1>
                    <p className="MenuDishCardDots">
                      ...............
                      <span className="MenuDishCardPrice">$ {data.price}</span>
                    </p>
                  </div>
                  <p className="MenuDishCarddishContent">
                    <ReactReadMoreReadLess
                      charLimit={150}
                      readMoreText={"Read more ▼"}
                      readLessText={"Read less ▲"}
                      readMoreClassName="read-more-less--more"
                      readLessClassName="read-more-less--less"
                    >
                      {data.description}
                    </ReactReadMoreReadLess>
                  </p>
                </div>
              </div>
            )) : null}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="add_category_container">
            <center>
              <img src={logo} alt="balken" />
            </center>
            <center>
              <h1 className="add_category_head">Select category</h1>
            </center>
            <div className="add_category_inputs">
              {categorydata.length !== 0 ? categorydata.map((data, index) => (
                <div className="Menu_container" key={index}>
                  <input
                    type="checkbox"
                    placeholder="Enter the category name"
                    id={data.name}
                    value={data.name}
                    onClick={getdata}
                  />
                  <label>{data.name}</label>
                </div>
              )) : null}
              <center>
                {selecteddataid !== null ? <button className="Category_inputs_addBtn" onClick={updatebtn}>Add</button> : <button className="Category_inputs_addBtn" onClick={addbtn}>Add</button>}

              </center>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Home_menu;
