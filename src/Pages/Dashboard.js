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
import { Line,Bar } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import { CategoryScale } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);
Chart.register(CategoryScale)
Chart.register(ArcElement);

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
  const [totaluser, settotaluser] = useState(0);
  const [totalorder, settotalorder] = useState(0);
  const [todaytotalorder, settodaytotalorder] = useState(0);
  const [total, settotal] = useState(0);
  const [todaytotal, settodaytotal] = useState(0);
  const [lastmonthtotal, setlastmonthtotal] = useState(0);
  const [pendingorder, setpendingorder] = useState([]);
  const [latestorder, setlatestorder] = useState([]);
  const [singleuser, setsingleuser] = useState([]);
  const [chartdate, setchartdate] = useState([]);
  const [chartdata, setchartdata] = useState([]);
  const [barchartdate, setbarchartdate] = useState([]);
  const [barchartdata, setbarchartdata] = useState([]);
  const viewMore = async (e) => {
    var singleorder = await pendingorder.filter((data) => {
      return data.order.id === Number(e.target.id);
    });
    if (singleorder.length !== 0) {
      setsingleuser(singleorder);
      handleOpen();
    }
  };


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
      var pendingorder = await allorder.filter((data) => { return data.status === "Ordered" })
      var finaldata = [];
      for (var i = 0; i < pendingorder.length; i++) {
        // eslint-disable-next-line no-loop-func
        var singleuser = await alluser.data.filter((data) => {
          return data.userid === pendingorder[i].userid;
        });
        finaldata.push({
          order: pendingorder[i],
          info: singleuser[0],
        });
      }
      setpendingorder(finaldata)
      const sortedDates = allorder.sort(function (a, b) {
        return b.createdAt.localeCompare(a.createdAt);
      });

      var finaldatanew = [];
      for (var i = 0; i < sortedDates.length; i++) {
        // eslint-disable-next-line no-loop-func
        var singleusernew = await alluser.data.filter((data) => {
          return data.userid === sortedDates[i].userid;
        });
        finaldatanew.push({
          order: sortedDates[i],
          info: singleusernew[0],
        });
      }
      setlatestorder(finaldatanew)
      const past7Days = [...Array(7).keys()].map(index => {
        const date = new Date();
        date.setDate(date.getDate() - index);

        return date;
      });
      const past4Days = [...Array(4).keys()].map(index => {
        const date = new Date();
        date.setDate(date.getDate() - index);

        return date;
      });
      var farmatdates = past7Days.sort((a, b) => {
        return new Date(a) - new Date(b);
      })
      var farmatdates4 = past4Days.sort((a, b) => {
        return new Date(a) - new Date(b);
      })
      var dateformat = [], earnings = []
      for (var a = 0; a < farmatdates.length; a++) {
        var dateone = moment(farmatdates[a]).format("DD-MM-YYYY")
        // eslint-disable-next-line no-loop-func
        var singleorder = await allorder.filter((data) => { return moment(data.createdAt).format("DD-MM-YYYY") === dateone })
        earnings.push(singleorder)
        dateformat.push(moment(farmatdates[a]).format("DD-MM-YYYY"))
      }
      var ordercount=[],dateformat4=[]
      for (var a = 0; a < farmatdates4.length; a++) {
        var dateone1 = moment(farmatdates4[a]).format("DD-MM-YYYY")
        // eslint-disable-next-line no-loop-func
        var singleorder1 = await allorder.filter((data) => { return moment(data.createdAt).format("DD-MM-YYYY") === dateone1 })
        ordercount.push(singleorder1.length)
        dateformat4.push(moment(farmatdates4[a]).format("DD-MM-YYYY"))
      }
      setbarchartdate(dateformat4)
      setbarchartdata(ordercount)
      var alllist = []
      for (var b = 0; b < earnings.length; b++) {
        if (earnings[b].length !== 0) {
          var allpricenew = []
          for (var c = 0; c < earnings[b].length; c++) {
            allpricenew.push(Number(earnings[b][c].price))
          }
          const todaysum = allpricenew.reduce((partialSum, a) => partialSum + a, 0);
          alllist.push(todaysum)
        } else {
          alllist.push(0)
        }
      }
      setchartdata(alllist)
      setchartdate(dateformat)
    }

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
  const state = {
    labels: chartdate,
    datasets: [
      {
        label: 'Earnings',
        fill: false,
        lineTension: 0,
        backgroundColor: '#B4DA87',
        borderColor: '#F57975',
        borderWidth: 2,
        data: chartdata,
        scaleSteps: 5,
        scaleOverride: true,
        scaleStartValue: 0,
        scaleStepWidth: 1,
      }

    ],
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 0, max: 500000 } }],
      }
    }
  }
  const state2 = {
    labels: barchartdate,
    datasets: [
      {
        label: 'Orders',
        fill: false,
        lineTension: 0,
        backgroundColor: '#B4DA87',
        borderColor: '#F57975',
        borderWidth: 2,
        data: barchartdata,
        scaleSteps: 5,
        scaleOverride: true,
        scaleStartValue: 0,
        scaleStepWidth: 1,
      }

    ],
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 0, max: 500000 } }],
      }
    }
  }
  return (
    <div className="Dashboard">
      <h2 className="Dashboard_page_head">Dashboard</h2>
      <div className="Dashboard_head">
        <div className="Dashboard_chart">
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
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
              <p>₹ {todaytotal}/-</p>
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
              <p>{pendingorder.length}</p>
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
                {pendingorder.length !== 0 ? pendingorder.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.order.foodname}</TableCell>
                    <TableCell>{data.order.price}</TableCell>
                    <TableCell>{data.info.name}</TableCell>
                    <TableCell>{data.order.status}</TableCell>

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
                )) : null}

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
                    <TableCell>Order Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestorder.length !== 0 ? latestorder.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.order.foodname}</TableCell>
                      <TableCell>{data.order.price}</TableCell>
                      <TableCell>{data.info.name}</TableCell>
                      <TableCell>{data.order.status}</TableCell>
                      <TableCell>{moment(data.order.createdAt).format("DD-MM-YYYY")}</TableCell>
                      <TableCell>
                        <center>
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
                        </center>
                      </TableCell>
                    </TableRow>
                  )) : null}

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
          <div className="Dashboard_small_chart">
          <Bar
            data={state2}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
          </div>
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
