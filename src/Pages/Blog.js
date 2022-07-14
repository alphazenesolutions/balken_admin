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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // add Category
  const addCategory = () => {
    handleOpen();
  };

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
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                1{" "}
              </TableCell>

              <TableCell align="center">
                <center>
                  <Avatar className="Category_table_img" src={testing}></Avatar>
                </center>
              </TableCell>
              <TableCell align="center">BBQ FANATICS</TableCell>

              <TableCell
                style={{ width: "30%", textAlign: "justify" }}
                align="center"
              >
                Food blogs are where cookbooks meet lifestyle magazines. The
                bloggers range from home cooks who enjoy
              </TableCell>
              <TableCell align="center">
                <center>
                  <div className="Category_actions">
                    <Avatar className="Category_edit_avatar">
                      <ModeEditOutlinedIcon className="Category_edit_icon" />
                    </Avatar>
                    <Avatar className="Category_delete_avatar">
                      <DeleteOutlineIcon className="Category_delete_icon" />
                    </Avatar>
                  </div>
                </center>
              </TableCell>
            </TableRow>
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
                <textarea rows={3} id="name" />
              </div>
              <div className="Category_inputs_container">
                <label> Long description</label>
                <textarea rows={7} id="name" />
              </div>
              <div className="Category_inputs_container">
                <label> Image</label>
                <input type="file" />
              </div>
              <center>
                <button className="Category_inputs_addBtn">Add</button>
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
