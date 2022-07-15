import React, { useEffect, useState } from "react";
import "../../Assests/css/Home.css";
import Kitchen from "../../Assests/img/kitchen.jpeg";
import axios from "axios";
import { firebase } from "../../database/firebase";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome_to_balken = () => {
  const [update, setupdate] = useState(false)
  const [updateid, setupdateid] = useState(null)
  const [aboutdata, setaboutdata] = useState([])
  const applybtn = async () => {
    var heading = document.getElementById("heading").value
    var subheading = document.getElementById("subheading").value
    var description = document.getElementById("description").value
    var file = document.getElementById("upfile").files
    if (heading.length === 0) {
      toast.error("Heading Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading.length === 0) {
      toast.error("Sub Heading Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (description.length === 0) {
      toast.error("Description Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (file[0] === undefined) {
      toast.error("Image Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else {
      toast.info("Please Wait...", {
        autoClose: 5000,
        transition: Slide,
      });
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
      var data = {
        img: imgurl,
        heading: heading,
        subheading: subheading,
        description: description
      }
      var createcategory = await axios
        .post(`${process.env.REACT_APP_SERVER}/about/create`, data)
        .then((res) => {
          return res.data;
        });

      if (createcategory !== null) {
        window.location.reload();
      }
    }
  }
  useEffect(() => {
    getaboutdata()
  }, [])
  const getaboutdata = async () => {
    var allaboutdata = await axios.get(`${process.env.REACT_APP_SERVER}/about/viewall`).then((res) => {
      return res.data;
    });
    if (allaboutdata.length !== 0) {
      setupdate(true)
      document.getElementById("heading").value = allaboutdata[0].heading
      document.getElementById("subheading").value = allaboutdata[0].subheading
      document.getElementById("description").value = allaboutdata[0].description
      setupdateid(allaboutdata[0].id)
      setaboutdata(allaboutdata)
    }
  }
  const updatebtn = async () => {
    var heading = document.getElementById("heading").value
    var subheading = document.getElementById("subheading").value
    var description = document.getElementById("description").value
    var file = document.getElementById("upfile").files
    if (heading.length === 0) {
      toast.error("Heading Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading.length === 0) {
      toast.error("Sub Heading Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (description.length === 0) {
      toast.error("Description Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (file[0] === undefined) {
      toast.error("Image Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else {
      toast.info("Please Wait...", {
        autoClose: 5000,
        transition: Slide,
      });
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
      var data = {
        img: imgurl,
        heading: heading,
        subheading: subheading,
        description: description,
        id: updateid
      }
      var createcategory = await axios
        .post(`${process.env.REACT_APP_SERVER}/about/update`, data)
        .then((res) => {
          return res.data;
        });
      if (createcategory !== null) {
        window.location.reload();
      }
    }
  }
  console.log(aboutdata)
  return (
    <div>
      <h1>About Balken</h1>
      <div>
        <div className="Home_kitchen_inputs">
          <div className="Swiper_inputs">
            <label>Heading</label>
            <input id="heading" />
          </div>
          <div className="Swiper_inputs">
            <label>Sub Heading</label>
            <input id="subheading" />
          </div>
          <div className="Swiper_inputs">
            <label>Description</label>
            <input id="description" />
          </div>
          <div className="Swiper_inputs">
            <label> Images</label>
            <input id="upfile" type="file" />
          </div>

          <div className="Swiper_actions">
            {update === true ? <button onClick={updatebtn}>Apply</button> : <button onClick={applybtn}>Apply</button>}

          </div>
        </div>
        {aboutdata.length !== 0 ?
          <div className="HomeKitchenContainer">
            <img src={aboutdata[0].img} alt="" />
            <div className="HomeKitchenContent">
              <div className="HomeKitchenContentss">
                <div className="ArtofCookingHead">
                  <h1 className="ArtofCookingWelcome">{aboutdata[0].heading}</h1>
                  <p className="ArtofCooking">{aboutdata[0].subheading}</p>
                  <p className="emptyBorder"></p>
                </div>
                <p className="ArtofCookingContent">
                  {aboutdata[0].description}
                </p>
                {/* <button className="ArtofCookingReadMoreBtn">READ MORE</button> */}
              </div>
            </div>
          </div> : null}

      </div>
      <ToastContainer />
    </div>
  );
};

export default Welcome_to_balken;
