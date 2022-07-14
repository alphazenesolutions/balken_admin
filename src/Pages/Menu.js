import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import "../Assests/css/Category.css";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/material/Modal";
import logo from "../Assests/img/logo.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebase } from "../database/firebase";
import "../Assests/css/Menu.css";
import food from "../Assests/img/Food1.jpg";

import axios from "axios";
import moment from "moment";
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
const style1 = {
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

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // add Category
  const addCategory = () => {
    handleOpen();
  };
  const [file, setfile] = React.useState(null);
  const [categorydata, setcategorydata] = React.useState([]);
  const [menudata, setmenudata] = React.useState([]);
  const [singlemenudata, setsinglemenudata] = React.useState([]);
  const handleChangenew = async (e) => {
    e.preventDefault();
    setfile(e.target.files);
  };
  const createbtn = async () => {
    var foodname = document.getElementById("foodname").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var offerprice = document.getElementById("offerprice").value;
    var quantity = document.getElementById("quantity").value;
    var type = document.getElementById("type").value;
    var category = document.getElementById("category").value;
    // var tag = document.getElementById("tag").value
    // var discount = document.getElementById("discount").value
    if (foodname.length === 0) {
      toast.error("Food Name Email !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("profile/" + file[0].name);
        storageRef.put(file[0]).then(function (snapshot) {
          storageRef.getDownloadURL().then(function (url) {
            //img download link ah ketakiradhu
            setTimeout(() => resolve(url), 1000);
          });
        });
      });
      var imgurl = await file11;
      if (imgurl === null) {
        toast.info("Profile Is Required...", {
          autoClose: 5000,
          transition: Slide,
        });
      } else {
        toast.info("Please Wait...", {
          autoClose: 5000,
          transition: Slide,
        });
        var data = {
          foodname: foodname,
          description: description,
          price: price,
          offerprice: offerprice,
          quantity: quantity,
          type: type === "Veg" ? 0 : 1,
          foodimg: imgurl,
          category: category,
          tag: null,
          discount: null,
        };
        var createcategory = await axios
          .post(`${process.env.REACT_APP_SERVER}/menu/create`, data)
          .then((res) => {
            return res.data;
          });

        if (createcategory !== null) {
          window.location.reload();
        }
      }
    }
  };
  useEffect(() => {
    getcategorydata();
  }, []);
  const getcategorydata = async () => {
    var allcategorydata = await axios
      .get(`${process.env.REACT_APP_SERVER}/category/viewall`)
      .then((res) => {
        return res.data;
      });
    setcategorydata(allcategorydata);
    var allmenudata = await axios
      .get(`${process.env.REACT_APP_SERVER}/menu/viewall`)
      .then((res) => {
        return res.data;
      });
    setmenudata(allmenudata);
  };
  const [foodname, setfoodname] = React.useState(null);
  const [price, setprice] = React.useState(null);
  const [offerprice, setofferprice] = React.useState(null);
  const [quantity, setquantity] = React.useState(null);
  const [description, setdescription] = React.useState(null);
  const [category, setcategory] = React.useState(null);
  const [type, settype] = React.useState(null);
  const [url, seturl] = React.useState(null);
  const [editoption, seteditoption] = React.useState(false);
  const [foodid, setfoodid] = React.useState(false);
  const editbtn = async (e) => {
    var single = await menudata.filter((data) => {
      return data.id === Number(e.target.id);
    });
    if (single.length !== 0) {
      setfoodname(single[0].foodname);
      setprice(single[0].price);
      setofferprice(single[0].offerprice);
      setquantity(single[0].quantity);
      setdescription(single[0].description);
      setcategory(single[0].category);
      settype(single[0].type);
      seturl(single[0].foodimg);
      setfoodid(single[0].id);
      handleOpen();
      seteditoption(true);
    }
  };
  const updatebtn = async () => {
    var foodname = document.getElementById("foodname").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var offerprice = document.getElementById("offerprice").value;
    var quantity = document.getElementById("quantity").value;
    var type = document.getElementById("type").value;
    var categoryvalue = document.getElementById("category").value;
    // var tag = document.getElementById("tag").value
    // var discount = document.getElementById("discount").value
    if (file !== null) {
      let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("profile/" + file[0].name);
        storageRef.put(file[0]).then(function (snapshot) {
          storageRef.getDownloadURL().then(function (url) {
            //img download link ah ketakiradhu
            setTimeout(() => resolve(url), 1000);
          });
        });
      });
      var imgurl = await file11;
    }

    toast.info("Please Wait...", {
      autoClose: 5000,
      transition: Slide,
    });
    var data = {
      foodname: foodname,
      description: description,
      price: price,
      offerprice: offerprice,
      quantity: quantity,
      type: type === "Veg" ? 0 : 1,
      foodimg: imgurl === undefined ? url : imgurl,
      category: categoryvalue === "Select Category" ? category : categoryvalue,
      tag: null,
      discount: null,
      id: foodid,
    };
    var createcategory = await axios
      .post(`${process.env.REACT_APP_SERVER}/menu/update`, data)
      .then((res) => {
        return res.data;
      });
    if (createcategory !== null) {
      window.location.reload();
    }
  };
  const deletebtn = async (e) => {
    var data = {
      testtid: e.target.id,
    };
    var deletemenu = await axios
      .post(`${process.env.REACT_APP_SERVER}/menu/destroy`, data)
      .then((res) => {
        return res.data;
      });
    if (deletemenu !== null) {
      window.location.reload();
    }
  };
  // view More
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const viewMore = async (e) => {
    var singlemenu = await menudata.filter((data) => {
      return data.id === Number(e.target.id);
    });
    if (singlemenu.length !== 0) {
      setsinglemenudata(singlemenu);
      handleOpen1();
    }
  };
  return (
    <div className="">
      <h2>Menu</h2>
      <TableContainer className="Menu_table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="Category_table_head" align="center">
                S. No
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Image
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Category
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Name
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Price
              </TableCell>
              {/* <TableCell className="Category_table_head" align="center">
                Food Offer Price
              </TableCell> */}
              <TableCell className="Category_table_head" align="center">
                Stock
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="Menu_table_body">
            {menudata.length !== 0
              ? menudata.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell align="center">
                      <center>
                        <Avatar
                          className="Category_table_img"
                          src={data.foodimg}
                        ></Avatar>
                      </center>
                    </TableCell>
                    <TableCell align="center">{data.category}</TableCell>
                    <TableCell align="center">{data.foodname}</TableCell>
                    <TableCell align="center">{data.price}</TableCell>
                    {/* <TableCell align="center">{data.offerprice}</TableCell> */}
                    <TableCell align="center">{data.quantity}</TableCell>

                    <TableCell align="center">
                      <center>
                        <div className="Category_actions">
                          <Avatar
                            id={data.id}
                            onClick={viewMore}
                            className="Menu_view_avatar"
                          >
                            <MoreHorizIcon id={data.id} />
                          </Avatar>
                          <Avatar
                            className="Category_edit_avatar"
                            id={data.id}
                            onClick={editbtn}
                          >
                            <ModeEditOutlinedIcon
                              className="Category_edit_icon"
                              id={data.id}
                            />
                          </Avatar>
                          <Avatar
                            className="Menu_delete_avatar"
                            id={data.id}
                            onClick={deletebtn}
                          >
                            <DeleteOutlineIcon
                              className="Category_delete_icon"
                              id={data.id}
                            />
                          </Avatar>
                        </div>
                      </center>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="Category_add">
        <Avatar onClick={addCategory} className="Category_add_avatar">
          <AddIcon className="Category_add_icon" />
        </Avatar>
      </div>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="add_category_containerbox">
          <div className="add_category_container">
            <center>
              <img src={logo} alt="balken" />
            </center>
            <center>
              <h1 className="add_category_head">Add Menu</h1>
            </center>
            <div className="add_category_inputs">
              <div className="Menu_inputs_container">
                <label>Food Category</label>
                <select className="form-control" id="category">
                  <option>Select Category</option>
                  {categorydata.length !== 0
                    ? categorydata.map((data, index) => (
                        <option value={data.name} key={index}>
                          {data.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="Menu_inputs_container">
                <label>Food Category</label>
                <select className="form-control" id="type">
                  <option>Select Type</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>
              <div className="Menu_inputs_container">
                <label>Food Name</label>
                <input
                  placeholder="Enter the category name"
                  defaultValue={foodname}
                  id="foodname"
                />
              </div>
              <div className="Menu_inputs_container">
                <label>Food Price</label>
                <input
                  placeholder="Enter the category name"
                  defaultValue={price}
                  id="price"
                />
              </div>
              <div className="Menu_inputs_container">
                <label>Food Offer Price</label>
                <input
                  placeholder="Enter the category name"
                  defaultValue={offerprice}
                  id="offerprice"
                />
              </div>
              <div className="Menu_inputs_container">
                <label>Food Quantity</label>
                <input
                  placeholder="Enter the category name"
                  defaultValue={quantity}
                  id="quantity"
                />
              </div>
              <div className="Menu_inputs_container">
                <label>Category Image</label>
                <input type="file" onChange={handleChangenew} />
              </div>
              <div className="Menu_inputs_container">
                <label>Food Description</label>
                <textarea
                  rows={5}
                  placeholder="About the food"
                  defaultValue={description}
                  id="description"
                />
              </div>
              <center>
                {editoption === true ? (
                  <button
                    className="Category_inputs_addBtn"
                    onClick={updatebtn}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="Category_inputs_addBtn"
                    onClick={createbtn}
                  >
                    Add
                  </button>
                )}
              </center>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          {singlemenudata.length !== 0
            ? singlemenudata.map((data, index) => (
                <div className="Menuview_container" key={index}>
                  <center>
                    <img src={logo} alt="balken" />
                  </center>
                  <center>
                    <h1 className="MenuView_head">{data.foodname} </h1>
                  </center>
                  <div>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Image</TableCell>
                            <TableCell>
                              <Avatar src={data.foodimg}></Avatar>
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Category</TableCell>
                            <TableCell>{data.category}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Type</TableCell>
                            <TableCell>
                              {data.type === true ? "Veg" : "Non-Veg"}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Tag</TableCell>
                            <TableCell>{data.tag}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Actual Price</TableCell>
                            <TableCell>{data.price} /-</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Offer Price</TableCell>
                            <TableCell>{data.offerprice} /-</TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Added on</TableCell>
                            <TableCell>
                              {moment(data.createdAt).format("DD MMMM YYYY")}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell> Description</TableCell>
                            <TableCell>{data.description}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              ))
            : null}
        </Box>
      </Modal>
    </div>
  );
};

export default Menu;
