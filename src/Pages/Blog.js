import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import "../Assests/css/Category.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../Assests/img/logo.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebase } from "../database/firebase";
import axios from "axios";
import testing from "../Assests/img/g2.jpeg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Blog = () => {
  const [open, setOpen] = React.useState(false);
  const [imgurl, setimgurl] = React.useState(null);
  const [updateurl, setupdateurl] = React.useState(null);
  const [blogdata, setblogdata] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // add Category
  const addCategory = () => {
    handleOpen();
  };
  const geturl = async (e) => {
    toast.info("Please Wait...", {
      autoClose: 5000,
      transition: Slide,
    });
    let file = e.target.files;
    let file13 = new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref("profile/" + file[0].name);
      storageRef.put(file[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          //img download link ah ketakiradhu
          setTimeout(() => resolve(url), 1000);
        });
      });
    });
    var imgurl1 = await file13;
    setimgurl(imgurl1)
  }
  const addbtn = async () => {
    var name = document.getElementById("name").value
    var shortdescription = document.getElementById("shortdescription").value
    var longdescription = document.getElementById("longdescription").value
    if (name.length === 0) {
      toast.error("Blog Heading Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (shortdescription.length === 0) {
      toast.error("Blog Short Description Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (longdescription.length === 0) {
      toast.error("Blog Description Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (imgurl === null) {
      toast.error("Blog Image Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else {
      var data = {
        blogheading: name,
        description: longdescription,
        shotdescription: shortdescription,
        blogimg: imgurl,
      }
      var createblog = await axios.post(`${process.env.REACT_APP_SERVER}/blog/create`, data).then((res) => {
        return res.data;
      });
      if (createblog !== null) {
        window.location.reload()
      }
    }
  }
  useEffect(() => {
    getblogdata();
  }, []);
  const getblogdata = async () => {
    var allblog = await axios.get(`${process.env.REACT_APP_SERVER}/blog/viewall`).then((res) => {
      return res.data;
    });
    setblogdata(allblog)
  }
  const editview = async (e) => {
    var singleblog = await blogdata.filter((data) => { return data.id === Number(e.target.id) })
    if (singleblog.length !== 0) {
      setOpen(true);
      setTimeout(() => {
        document.getElementById("name").value = singleblog[0].blogheading
        document.getElementById("shortdescription").value = singleblog[0].shotdescription
        document.getElementById("longdescription").value = singleblog[0].description
        setimgurl(singleblog[0].blogimg)
        setupdateurl(singleblog[0].id)
      }, 1000);
    }
  }
  const deltebtn = async (e) => {
    var data = {
      testtid: e.target.id
    }
    var deleteblog = await axios.post(`${process.env.REACT_APP_SERVER}/blog/destroy`, data).then((res) => { return res.data })
    if (deleteblog !== null) {
      window.location.reload()
    }
  }
  const updatbtnbtn = async () => {
    var name = document.getElementById("name").value
    var shortdescription = document.getElementById("shortdescription").value
    var longdescription = document.getElementById("longdescription").value
    var data = {
      blogheading: name,
      description: longdescription,
      shotdescription: shortdescription,
      blogimg: imgurl,
      id: updateurl
    }
    var createblog = await axios.post(`${process.env.REACT_APP_SERVER}/blog/update`, data).then((res) => {
      return res.data;
    });
    if (createblog !== null) {
      window.location.reload()
    }
  }
  return (
    <div className="">
      <h2>Blog</h2>
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
                Blog Name
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Short description
              </TableCell>
              <TableCell className="Category_table_head" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogdata.length !== 0 ? blogdata.map((data, index) => (
              <TableRow key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  1{" "}
                </TableCell>

                <TableCell align="center">
                  <center>
                    <Avatar className="Category_table_img" src={data.blogimg}></Avatar>
                  </center>
                </TableCell>
                <TableCell align="center">{data.blogheading}</TableCell>

                <TableCell
                  style={{ width: "30%", textAlign: "justify" }}
                  align="center"
                >
                  {data.shotdescription}
                </TableCell>
                <TableCell align="center">
                  <center>
                    <div className="Category_actions">
                      <Avatar className="Category_edit_avatar" id={data.id} onClick={editview}>
                        <ModeEditOutlinedIcon className="Category_edit_icon" id={data.id} />
                      </Avatar>
                      <Avatar className="Category_delete_avatar" id={data.id} onClick={deltebtn}>
                        <DeleteOutlineIcon className="Category_delete_icon" id={data.id} />
                      </Avatar>
                    </div>
                  </center>
                </TableCell>
              </TableRow>
            )) : null}

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
              <h1 className="add_category_head">Add Blog</h1>
            </center>
            <div className="add_category_inputs">
              <div className="Category_inputs_container">
                <label> Name</label>
                <input id="name" />
              </div>
              <div className="Category_inputs_container">
                <label> Short description</label>
                <textarea rows={3} id="shortdescription" />
              </div>
              <div className="Category_inputs_container">
                <label> Long description</label>
                <textarea rows={7} id="longdescription" />
              </div>
              <div className="Category_inputs_container">
                <label> Image</label>
                <input type="file" onChange={geturl} />
              </div>
              <center>
                {updateurl === null ? <button className="Category_inputs_addBtn" onClick={addbtn}>Add</button> : <button className="Category_inputs_addBtn" onClick={updatbtnbtn}>Update</button>}

              </center>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Blog;
