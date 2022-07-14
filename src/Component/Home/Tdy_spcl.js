import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import testing from "../../Assests/img/Food1.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../../Assests/css/Home.css";
import axios from "axios";
const Tdy_spcl = () => {
  const [spcl_1, setspcl_1] = useState(false);
  const [spcl_2, setspcl_2] = useState(false);
  const [spcl_3, setspcl_3] = useState(false);
  const [spcl_4, setspcl_4] = useState(false);
  const [spcl_id1, setspcl_id1] = useState(null);
  const [spcl_id2, setspcl_id2] = useState(null);
  const [spcl_id3, setspcl_id3] = useState(null);
  const [spcl_id4, setspcl_id4] = useState(null);
  const [allmenuitem, setallmenuitem] = useState([]);
  const [myfooditem, setmyfooditem] = useState([]);

  const spcl_1_handler = () => {
    getmenudata()
    setspcl_1(true);
  };
  const spcl_2_handler = () => {
    getmenudata()
    setspcl_2(true);
  };
  const spcl_3_handler = () => {
    getmenudata()
    setspcl_3(true);
  };
  const spcl_4_handler = () => {
    getmenudata()
    setspcl_4(true);
  };
  useEffect(() => {
    getmenudata()
  }, [])
  const getmenudata = async () => {
    var allmenu = await axios
      .get(`${process.env.REACT_APP_SERVER}/menu/viewall`)
      .then((res) => {
        return res.data;
      });
    setallmenuitem(allmenu)
    var todaymenu = await axios
      .get(`${process.env.REACT_APP_SERVER}/todayspl/viewall`)
      .then((res) => {
        return res.data;
      });
    if (todaymenu.length !== 0) {
      var myfoodlist = []
      for (var i = 0; i < todaymenu.length; i++) {
        // eslint-disable-next-line no-loop-func
        var singlemenu = await allmenu.filter((data) => { return data.foodid === todaymenu[i].item })
        myfoodlist.push(singlemenu[0])
      }
      setmyfooditem(myfoodlist)

    }

  }
  const getfoodinfo = async (e) => {
    var data = {
      item: e.target.id
    }
    var createmenu = await axios.post(`${process.env.REACT_APP_SERVER}/todayspl/create`, data).then((res) => { return res.data })
    if (createmenu !== null) {
      window.location.reload()
    }
  }
  return (
    <div>
      <h1>Today's Special</h1>
      <div className="tdy_spcl">
        <div className="Tdy_spcl_data">
          <div className="Swiper_1">
            <div className="tdy_spcl_inputs">
              <input onChange={spcl_1_handler} placeholder="Search Food" />
              {spcl_1 && (
                <div className="food_resultsnew">
                  <ul>
                    {allmenuitem.length !== 0 ? allmenuitem.map((data, index) => (
                      <li className="food_results_li" key={index} id={data.foodid} onClick={getfoodinfo}>
                        <Avatar src={data.foodimg} id={data.foodid}></Avatar>
                        {data.foodname}
                      </li>
                    )) : null}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="Swiper_1">
            <div className="tdy_spcl_inputs">
              <input onChange={spcl_2_handler} placeholder="Search Food" />
              {spcl_2 && (
                <div className="food_resultsnew">
                  <ul>
                    {allmenuitem.length !== 0 ? allmenuitem.map((data, index) => (
                      <li className="food_results_li" key={index} id={data.foodid} onClick={getfoodinfo}>
                        <Avatar src={data.foodimg} id={data.foodid}></Avatar>
                        {data.foodname}
                      </li>
                    )) : null}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="Swiper_1">
            <div className="tdy_spcl_inputs">
              <input onChange={spcl_3_handler} placeholder="Search Food" />
              {spcl_3 && (
                <div className="food_results">
                  <ul>
                    {allmenuitem.length !== 0 ? allmenuitem.map((data, index) => (
                      <li className="food_results_li" key={index} id={data.foodid} onClick={getfoodinfo}>
                        <Avatar src={data.foodimg} id={data.foodid}></Avatar>
                        {data.foodname}
                      </li>
                    )) : null}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="Swiper_1">
            <div className="tdy_spcl_inputs">
              <input onChange={spcl_4_handler} placeholder="Search Food" />
              {spcl_4 && (
                <div className="food_results">
                  <ul>
                    {allmenuitem.length !== 0 ? allmenuitem.map((data, index) => (
                      <li className="food_results_li" key={index} id={data.foodid} onClick={getfoodinfo}>
                        <Avatar src={data.foodimg} id={data.foodid}></Avatar>
                        {data.foodname}
                      </li>
                    )) : null}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="Tdy_spcl_actions">
            <button>Apply</button>
          </div>
        </div>
      </div>
      <div className="tdy_spcl_preview">
        <div className="HomeSpecialCards">
          {myfooditem.length !== 0 ? myfooditem.map((data) => (
            <Card sx={{ maxWidth: 255 }} className="HomeSpecialCard">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="220"
                  image={data.foodimg}
                  alt="green iguana"
                />
                <CardContent>
                  <center>
                    <Typography
                      className="HomeSpecialCardHead"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {data.foodname}
                    </Typography>
                  </center>
                  <center>
                    <Typography className="HomeSpecialCardPrice" variant="body2">
                      $ {data.price}
                    </Typography>
                  </center>
                </CardContent>
              </CardActionArea>
            </Card>
          )) : null}
        </div>
      </div>
    </div>
  );
};

export default Tdy_spcl;
