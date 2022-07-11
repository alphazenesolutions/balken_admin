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
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import logo from "../Assests/img/logo.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebase } from "../database/firebase";
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

const Category = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // add Category
  const addCategory = () => {
    handleOpen();
  };
  const [file, setfile] = React.useState(null);
  const [categorydata, setcategorydata] = React.useState([]);
  const handleChangenew = async (e) => {
    console.log(e.target.files);
    e.preventDefault();
    setfile(e.target.files);
  };
  const createbtn = async () => {
    var name = document.getElementById("name").value;
    if (name.length === 0) {
      toast.error("Name Email !", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      console.log(file[0]);
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
          name: name,
          img: imgurl,
        };
        var createcategory = await axios
          .post(`${process.env.REACT_APP_SERVER}/category/create`, data)
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
  };
  const [name, setname] = React.useState(null);
  const [imageurl, setimageurl] = React.useState(null);
  const [editoption, seteditoption] = React.useState(null);
  const [categoryid, setcategoryid] = React.useState(null);
  const editbtn = async (e) => {
    var singledata = await categorydata.filter((data) => {
      return data.id === Number(e.target.id);
    });
    if (singledata.length !== 0) {
      handleOpen();
      setname(singledata[0].name);
      setimageurl(singledata[0].img);
      seteditoption(true);
      setcategoryid(singledata[0].id);
    }
  };
  const updatebtn = async () => {
    var name = document.getElementById("name").value;
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
      name: name,
      img: imgurl === undefined ? imageurl : imgurl,
      id: categoryid,
    };
    var createcategory = await axios
      .post(`${process.env.REACT_APP_SERVER}/category/update`, data)
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
      .post(`${process.env.REACT_APP_SERVER}/category/destroy`, data)
      .then((res) => {
        return res.data;
      });
    if (deletemenu !== null) {
      window.location.reload();
    }
  };
  return (
    <div className="">
      <h2>Category</h2>
      <TableContainer className="Category_table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="Category_table_head" align="center">
                S. No
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Image
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Category Name
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorydata.length !== 0
              ? categorydata.map((data, index) => (
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
                          src={data.img}
                        ></Avatar>
                      </center>
                    </TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">
                      <center>
                        <div className="Category_actions">
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
                            className="Category_delete_avatar"
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
        <Box sx={style}>
          <div className="add_category_container">
            <center>
              <img src={logo} alt="balken" />
            </center>
            <center>
              <h1 className="add_category_head">Add Category</h1>
            </center>
            <div className="add_category_inputs">
              <div className="Category_inputs_container">
                <label>Category Name</label>
                <input
                  placeholder="Enter the category name"
                  defaultValue={name}
                  id="name"
                />
              </div>
              <div className="Category_inputs_container">
                <label>Category Image</label>
                <input type="file" onChange={handleChangenew} />
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
    </div>
  );
};

export default Category;
