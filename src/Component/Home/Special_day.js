import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Assests/css/Home.css";
import moment from "moment";

const Special_day = () => {
  const [day, setday] = useState(0);
  const [hours, sethours] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [distance, setdistance] = useState(0);
  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  const applybtn = async () => {
    var date = document.getElementById("date").value
    var time = document.getElementById("time").value
    var data = {
      date: date,
      time: `${time}:00`,
      notes: "test"
    }
    var createtimeslot = await axios.post(`${process.env.REACT_APP_SERVER}/countdown/create`, data)
    if (createtimeslot !== null) {
      window.location.reload()
    }
  }

  useEffect(() => {
    gettimer();
  }, []);
  const gettimer = async () => {
    var today = moment().format("YYYY-MM-DD");
    var countdowndata = await axios
      .get(`${process.env.REACT_APP_SERVER}/countdown/viewall`)
      .then((res) => {
        return res.data;
      });
    var checkdata = await countdowndata.filter((data) => {
      return data.date > today;
    });
    if (checkdata.length !== 0) {
      var value = `${checkdata[0].date}, ${checkdata[0].time}`;
      setdate(checkdata[0].date)
      settime(checkdata[0].time)
      var date = new Date(`${value}`);
      var countDownDate = date.getTime();
      setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance !== 0) {
          setday(days);
          sethours(hours);
          setminutes(minutes);
          setseconds(seconds);
          setdistance(distance);
        }
      }, 1000);
    }
  };
  return (
    <div>
      <h1>Special Day</h1>
      <div className="Home_spcl_day_inputs">
        <div className="Swiper_inputs">
          <label>Special day</label>
          <input type="date" id="date" />
        </div>
        <div className="Swiper_inputs">
          <label>Time</label>
          <input type="time" id="time" />
        </div>
        <div className="Swiper_actions">
          <button onClick={applybtn}>Apply</button>
        </div>
      </div>
      <div className="special_day_result">
        <p className="special_day-date">{date}-{time}</p>
        {distance !== 0 ? (
          <div className="HomecountContent">
            <div className="HomecountHead">
              <h1>SPECIAL COUNTDOWN</h1>
            </div>
            <div className="HomecountNumbers">
              <div className="HomecountNumber">
                {" "}
                <p className="HomecountTime">{day}</p>{" "}
                <p className="HomecountTim">DAYS</p>
              </div>
              <div className="HomecountNumber">
                {" "}
                <p className="HomecountTime">{hours}</p>{" "}
                <p className="HomecountTim">HOURS</p>
              </div>
              <div className="HomecountNumber">
                {" "}
                <p className="HomecountTime">{minutes}</p>{" "}
                <p className="HomecountTim">MINUTES</p>
              </div>
              <div className="HomecountNumber">
                {" "}
                <p className="HomecountTime">{seconds}</p>{" "}
                <p className="HomecountTim">SECONDS</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Special_day;
