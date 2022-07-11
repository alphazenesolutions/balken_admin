import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import axios from "axios";
import moment from "moment";
import "../../Assests/css/User.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../../Assests/img/logo.png";
import TagFacesIcon from "@mui/icons-material/TagFaces";

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

const Userlist = () => {
  const [userlist, setuserlist] = useState([]);
  const [singleuser, setsingleuser] = useState([]);
  const [totalorder, settotalorder] = useState(0);
  useEffect(() => {
    getuserdata();
  }, []);
  const getuserdata = async () => {
    var alluser = await axios
      .get(`${process.env.REACT_APP_SERVER}/users/viewall`)
      .then((res) => {
        return res.data;
      });
    setuserlist(alluser.data);
  };
  // view user
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const viewMore = async (e) => {
    var singleuser = await userlist.filter((data) => { return data.id === Number(e.target.id) })
    var allorder = await axios.get(`${process.env.REACT_APP_SERVER}/order/viewall`).then((res) => { return res.data })
    if (singleuser.length !== 0) {
      var myorder = await allorder.filter((data)=>{return data.userid===singleuser[0].userid})
      settotalorder(myorder.length)
      setsingleuser(singleuser)
      handleOpen();
    }
  };
  return (
    <div>
      <Stack spacing={10} direction="row">
        <h2>User List</h2>
      </Stack>
      <TableContainer className="User_table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="Category_table_head">S. No</TableCell>
              <TableCell className="Category_table_head">Name</TableCell>
              <TableCell className="Category_table_head">Email</TableCell>
              <TableCell className="Category_table_head">Phone</TableCell>
              {/* <TableCell className="Category_table_head">Join On</TableCell> */}
              <TableCell className="Category_table_head">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userlist.length !== 0
              ? userlist.map((data, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  {/* <TableCell>
                      {moment(data.createdAt).format("MMMM Do YYYY")}
                    </TableCell> */}
                  <TableCell>
                    <Avatar id={data.id} onClick={viewMore} className="user_view_avatar">
                      <MoreHorizIcon id={data.id} />
                    </Avatar>
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {singleuser.length !== 0 ? singleuser.map((data, index) => (
            <div className="userview_container" key={index}>
              <center>
                <img src={logo} alt="balken" />
              </center>
              <center>
                <div className="User_name">
                  <h1 className="userview_head">{data.name} </h1>
                  <Avatar className="user_avatar">
                    <TagFacesIcon />
                  </Avatar>
                </div>
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
                        <TableCell> E-mail</TableCell>
                        <TableCell>{data.email}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell> Phone</TableCell>
                        <TableCell>{data.phone}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell> Joined on</TableCell>
                        <TableCell>{moment(data.createdAt).format("MMMM Do YYYY")}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell> Total Orders</TableCell>
                        <TableCell>{totalorder}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default Userlist;
