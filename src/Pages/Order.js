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
import CloseIcon from "@mui/icons-material/Close";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Avatar } from "@mui/material";
import "../Assests/css/Order.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../Assests/img/logo.png";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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
  useEffect(() => {
    getuserdata();
  }, []);
  const getuserdata = async () => {
    var allorder = await axios
      .get(`${process.env.REACT_APP_SERVER}/order/viewall`)
      .then((res) => {
        return res.data;
      });
    var alluser = await axios
      .get(`${process.env.REACT_APP_SERVER}/users/viewall`)
      .then((res) => {
        return res.data;
      });
    var finaldata = [];
    for (var i = 0; i < allorder.length; i++) {
      // eslint-disable-next-line no-loop-func
      var singleuser = await alluser.data.filter((data) => {
        return data.userid === allorder[i].userid;
      });
      finaldata.push({
        order: allorder[i],
        info: singleuser[0],
      });
    }
    setuserlist(finaldata);
  };
  const changestatus = async (e) => {
    var data = {
      status: "Delivery",
      id: e.target.id,
    };
    var createcategory = await axios
      .post(`${process.env.REACT_APP_SERVER}/order/update`, data)
      .then((res) => {
        return res.data;
      });
    if (createcategory !== null) {
      window.location.reload();
    }
  };
  const changestatuscancel = async (e) => {
    var data = {
      status: "Cancel",
      id: e.target.id,
    };
    var createcategory = await axios
      .post(`${process.env.REACT_APP_SERVER}/order/update`, data)
      .then((res) => {
        return res.data;
      });
    if (createcategory !== null) {
      window.location.reload();
    }
  };
  // view more
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const viewMore = async (e) => {
    var singleorder = await userlist.filter((data) => {
      return data.order.id === Number(e.target.id);
    });
    if (singleorder.length !== 0) {
      setsingleuser(singleorder);
      handleOpen();
    }
  };

  return (
    <div>
      <Stack spacing={10} direction="row">
        <h2>Order Details</h2>
      </Stack>
      <TableContainer className="Order_table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. No</TableCell>
              <TableCell>Food Name</TableCell>
              <TableCell>Price</TableCell>
              {/* <TableCell>Quantity</TableCell> */}
              <TableCell>Customer Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userlist.length !== 0
              ? userlist.map((data, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.order.foodname}</TableCell>
                  <TableCell>{data.order.price}</TableCell>
                  {/* <TableCell>{data.order.quantity}</TableCell> */}
                  <TableCell>{data.info.name}</TableCell>
                  <TableCell>{data.order.status}</TableCell>
                  {/* <TableCell>
                      {data.order.status === "Cancel" ||
                      data.order.status === "Delivery" ? null : (
                        <select
                          className="select"
                          id={data.order.id}
                          onChange={changestatus}
                        >
                          <option>Select</option>
                          <option value="Cancel">Cancel</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                      )}
                    </TableCell> */}

                  <TableCell>
                    <center>
                      <div className="Order_actions">
                        {data.order.status === "Cancel" ||
                          data.order.status === "Delivery" ? (
                          <>
                            <Avatar
                              id={data.order.id}
                              onClick={viewMore}
                              className="Order_view_avatar"
                            >
                              <MoreHorizIcon
                                className="Order_view_icon"
                                id={data.order.id}
                              />
                            </Avatar>
                            <Avatar
                              className="Order_edit_avatar"
                              id={data.order.id}
                            >
                              <DeliveryDiningIcon
                                className="Order_edit_icon"
                                id={data.order.id}
                              />
                            </Avatar>
                            <Avatar
                              className="Order_delete_avatar"
                              id={data.order.id}
                            >
                              <CloseIcon
                                className="Order_delete_icon"
                                id={data.order.id}
                              />
                            </Avatar>
                          </>
                        ) : (
                          <>
                            <Avatar
                              id={data.order.id}
                              onClick={viewMore}
                              className="Order_view_avatar"
                            >
                              <MoreHorizIcon
                                className="Order_view_icon"
                                id={data.order.id}
                              />
                            </Avatar>
                            <Avatar
                              className="Order_edit_avatar"
                              id={data.order.id}
                              onClick={changestatus}
                            >
                              <DeliveryDiningIcon
                                className="Order_edit_icon"
                                id={data.order.id}
                                onClick={changestatus}
                              />
                            </Avatar>
                            <Avatar
                              className="Order_delete_avatar"
                              id={data.order.id}
                              onClick={changestatuscancel}
                            >
                              <CloseIcon
                                className="Order_delete_icon"
                                id={data.order.id}
                                onClick={changestatuscancel}
                              />
                            </Avatar>
                          </>
                        )}
                      </div>
                    </center>
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
          {singleuser.length !== 0
            ? singleuser.map((data, index) => (
              <div className="orderview_container" key={index}>
                <center>
                  <img src={logo} alt="balken" />
                </center>
                <center>
                  <h1 className="orderview_head">
                    {data.info.name}'s Order{" "}
                  </h1>
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
                          <TableCell>Food Name</TableCell>
                          <TableCell>{data.order.foodname}</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Quantity</TableCell>
                          <TableCell>{data.order.quantity}</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Price</TableCell>
                          <TableCell>{data.order.price} /-</TableCell>
                        </TableRow>
                        {data.order.status === "Delivery" ||
                          data.order.status === "Ordered" ? (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Status</TableCell>
                            <TableCell>
                              <Avatar className="Order_delivered_status">
                                <TagFacesIcon />
                              </Avatar>
                              {/* <span className="Order_delivered_status">
                          Delivered
                        </span> */}
                            </TableCell>
                          </TableRow>
                        ) : null}
                        {data.order.status === "Cancel" ? (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Status</TableCell>
                            <TableCell>
                              <Avatar className="Order_Cancel_status">
                                <SentimentVeryDissatisfiedIcon />
                              </Avatar>
                              {/* <span className="Order_delivered_status">
                            Delivered
                          </span> */}
                            </TableCell>
                          </TableRow>
                        ) : null}

                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Customer E-mail</TableCell>
                          <TableCell>{data.info.email}</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Customer Phone</TableCell>
                          <TableCell>{data.info.phone}</TableCell>
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

export default Userlist;
