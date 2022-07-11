import React, { useEffect, useState } from "react";
import "../Assests/css/dashboard.css";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import axios from "axios";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../Assests/img/logo.png";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
const Dashboard = () => {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //
  const style2 = {
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
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const viewMore = () => {
    handleOpen();
  };
  const viewMore_delivered = () => {
    handleOpen2();
  };
  //
  const [totaluser, settotaluser] = useState(0);
  const [totalorder, settotalorder] = useState(0);
  const [todaytotalorder, settodaytotalorder] = useState(0);
  const [total, settotal] = useState(0);
  const [todaytotal, settodaytotal] = useState(0);
  const [lastmonthtotal, setlastmonthtotal] = useState(0);
  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = async () => {
    var alluser = await axios
      .get(`${process.env.REACT_APP_SERVER}/users/viewall`)
      .then((res) => {
        return res.data;
      });
    var allorder = await axios
      .get(`${process.env.REACT_APP_SERVER}/order/viewall`)
      .then((res) => {
        return res.data;
      });
    settotaluser(alluser.data.length);
    settotalorder(allorder.length);
    if (allorder.length !== 0) {
      var allprice = [],
        todayprice = [],
        lastmonthprice = [];
      for (var i = 0; i < allorder.length; i++) {
        var todaydate = moment().format("DD-MM-YYYY");
        var date = moment(allorder[i].createdAt).format("DD-MM-YYYY");
        var lastmonth = moment().subtract(1, "month").format("MM");
        var month = moment(allorder[i].createdAt).format("MM");
        console.log(lastmonth, month);
        if (todaydate === date) {
          todayprice.push(Number(allorder[i].price));
        }
        if (lastmonth === month) {
          lastmonthprice.push(Number(allorder[i].price));
        }
        allprice.push(Number(allorder[i].price));
      }
      settodaytotalorder(todayprice.length);
      const todaysum = todayprice.reduce((partialSum, a) => partialSum + a, 0);
      const sum = allprice.reduce((partialSum, a) => partialSum + a, 0);
      const lastmonthsum = lastmonthprice.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      settotal(sum);
      settodaytotal(todaysum);
      setlastmonthtotal(lastmonthsum);
    }
  };
  return (
    <div className="Dashboard">
      <h2 className="Dashboard_page_head">Dashboard</h2>
      <div className="Dashboard_head">
        <div className="Dashboard_chart"></div>
        <div className="Dashboard_Cards">
          <div className="Dashboard_cards_card">
            <div className="Dashboard_cards_card_content">
              <h2>This Month</h2>
              <p>₹ {total}/-</p>
            </div>
            <div className="Dashboard_cards_card_actions">
              <button>View More</button>
            </div>
          </div>

          <div className="Dashboard_cards_card">
            <div className="Dashboard_cards_card_content">
              <h2 className="color">Today Earnings</h2>
              <p>₹ {lastmonthtotal}/-</p>
            </div>
            <div className="Dashboard_cards_card_actions">
              <button className="button_2">View More</button>
            </div>
          </div>
          <div className="Dashboard_cards_card">
            <div className="Dashboard_cards_card_content">
              <h2>Total Orders</h2>
              <p>{totalorder}</p>
            </div>
            <div className="Dashboard_cards_card_actions">
              <button>View More</button>
            </div>
          </div>
          <div className="Dashboard_cards_card">
            <div className="Dashboard_cards_card_content">
              <h2 className="color">Pending Orders</h2>
              <p>10</p>
            </div>
            <div className="Dashboard_cards_card_actions">
              <button className="button_2">View More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="Dashboard_body">
        <div>
          <Stack spacing={10} direction="row">
            <h4>Pending Orders </h4>
          </Stack>
          <TableContainer className="Pending_Order_table" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S. No</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Customer Details</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>foodname</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>Ordered</TableCell>

                  <TableCell>
                    <center>
                      <div className="Pending_Order_actions">
                        <>
                          <Avatar className="Pending_Order_view_avatar">
                            <MoreHorizIcon
                              onClick={viewMore}
                              className="Pending_Order_edit_icon"
                            />
                          </Avatar>
                          <Avatar className="Pending_Order_edit_avatar">
                            <DeliveryDiningIcon className="Pending_Order_edit_icon" />
                          </Avatar>
                          <Avatar className="Pending_Order_delete_avatar">
                            <CloseIcon className="Pending_Order_edit_icon" />
                          </Avatar>
                        </>
                      </div>
                    </center>
                  </TableCell>
                </TableRow>
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
              <div className="Pending_orderview_container">
                <center>
                  <img src={logo} alt="balken" />
                </center>
                <center>
                  <h1 className="Pending_orderview_head">Pending Order </h1>
                </center>
                <div>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell>Food Name</TableCell>
                          <TableCell>foodname</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell>Quantity</TableCell>
                          <TableCell>quantity</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell>Price</TableCell>
                          <TableCell>price /-</TableCell>
                        </TableRow>
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

                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell>Customer E-mail</TableCell>
                          <TableCell>email</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell>Customer Phone</TableCell>
                          <TableCell>phone</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="Delivered_orders_container">
          <div className="Dashboard_Delivered_orders">
            <Stack spacing={10} direction="row">
              <h4>Last Transaction </h4>
            </Stack>
            <TableContainer className="Pending_Order_table" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S. No</TableCell>
                    <TableCell>Food Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Customer Details</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>foodname</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>Ordered</TableCell>

                    <TableCell>
                      <center>
                        <div className="Pending_Order_actions">
                          <>
                            <Avatar className="Pending_Order_view_avatar">
                              <MoreHorizIcon
                                onClick={viewMore_delivered}
                                className="Pending_Order_edit_icon"
                              />
                            </Avatar>
                          </>
                        </div>
                      </center>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <div className="Pending_orderview_container">
                  <center>
                    <img src={logo} alt="balken" />
                  </center>
                  <center>
                    <h1 className="Pending_orderview_head">Delivered Order </h1>
                  </center>
                  <div>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Food Name</TableCell>
                            <TableCell>foodname</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Quantity</TableCell>
                            <TableCell>quantity</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Price</TableCell>
                            <TableCell>price /-</TableCell>
                          </TableRow>
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

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Customer E-mail</TableCell>
                            <TableCell>email</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>Customer Phone</TableCell>
                            <TableCell>phone</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className="Dashboard_small_chart"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <div className="Dashboard_head">
  <div className="card dashcard">
    <div className="card-body">
      <h2>Total Earnings</h2>
      <p className="Dashboard_earnings">₹ {total} /-</p>
      <div className="dashbutton"></div>
    </div>
  </div>
  <div className="card dashcard">
    <div className="card-body">
      <h2>Last Month Earnings</h2>
      <p className="Dashboard_earnings">₹ {lastmonthtotal} /-</p>
      <div className="dashbutton"></div>
    </div>
  </div>
  <div className="card dashcard">
    <div className="card-body">
      <h2>Today Earnings</h2>
      <p className="Dashboard_earnings">₹ {todaytotal} /-</p>
      <div className="dashbutton"></div>
    </div>
  </div>
  <div className="card dashcard">
    <div className="card-body">
      <h2>Total Customers</h2>
      <p className="Dashboard_earnings"> {totaluser}</p>
      <div className="dashbutton"></div>
    </div>
  </div>
  <div className="card dashcard">
    <div className="card-body">
      <h2>Total Orders</h2>
      <p className="Dashboard_earnings"> {totalorder} </p>
      <div className="dashbutton"></div>
    </div>
  </div>
  <div className="card dashcard">
    <div className="card-body">
      <h2>Today Orders</h2>
      <p className="Dashboard_earnings"> {todaytotalorder} </p>
      <div className="dashbutton"></div>
    </div>
  </div>
</div>; */
}
