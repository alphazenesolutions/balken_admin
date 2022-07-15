import React, { useState, useEffect } from "react";
import "../../Assests/css/Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import wallpaper from "../../Assests/img/Buffalo Tripe-.png";
import wallpaper1 from "../../Assests/img/g2.jpeg";
import wallpaper2 from "../../Assests/img/home.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { firebase } from "../../database/firebase";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import required modules
import { Pagination } from "swiper";
const Swiper_Head = () => {
  const [update, setupdate] = useState(false)
  const [updateid1, setupdateid1] = useState(null)
  const [updateid2, setupdateid2] = useState(null)
  const [updateid3, setupdateid3] = useState(null)
  const [imgvalue1, setimgvalue1] = useState(null)
  const [imgvalue2, setimgvalue2] = useState(null)
  const [imgvalue3, setimgvalue3] = useState(null)
  const [aboutdata, setaboutdata] = useState([])

  const applybtn = async () => {
    var heading1 = document.getElementById("heading1").value
    var heading2 = document.getElementById("heading2").value
    var heading3 = document.getElementById("heading3").value
    var subheading1 = document.getElementById("subheading1").value
    var subheading2 = document.getElementById("subheading2").value
    var subheading3 = document.getElementById("subheading3").value
    var file1 = document.getElementById("upfile1").files
    var file2 = document.getElementById("upfile2").files
    var file3 = document.getElementById("upfile3").files
    if (heading1.length === 0) {
      toast.error("Heading 1 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading1.length === 0) {
      toast.error("Sub Heading 1 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (heading2.length === 0) {
      toast.error("Heading 2 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading2.length === 0) {
      toast.error("Sub Heading 2 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (heading3.length === 0) {
      toast.error("Heading 3 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading3.length === 0) {
      toast.error("Sub Heading 3 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (file1[0] === undefined) {
      toast.error("Image 1 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (file2[0] === undefined) {
      toast.error("Image 2 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (file3[0] === undefined) {
      toast.error("Image 3 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else {
      toast.info("Please Wait...", {
        autoClose: 5000,
        transition: Slide,
      });
      let file11 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("profile/" + file1[0].name);
        storageRef.put(file1[0]).then(function (snapshot) {
          storageRef.getDownloadURL().then(function (url) {
            //img download link ah ketakiradhu
            setTimeout(() => resolve(url), 1000);
          });
        });
      });
      let file12 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("profile/" + file2[0].name);
        storageRef.put(file2[0]).then(function (snapshot) {
          storageRef.getDownloadURL().then(function (url) {
            //img download link ah ketakiradhu
            setTimeout(() => resolve(url), 1000);
          });
        });
      });
      let file13 = new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref("profile/" + file3[0].name);
        storageRef.put(file3[0]).then(function (snapshot) {
          storageRef.getDownloadURL().then(function (url) {
            //img download link ah ketakiradhu
            setTimeout(() => resolve(url), 1000);
          });
        });
      });
      var imgurl1 = await file11;
      var imgurl2 = await file12;
      var imgurl3 = await file13;
      var data1 = {
        img: imgurl1,
        heading: heading1,
        subheading: subheading1
      }
      var data2 = {
        img: imgurl2,
        heading: heading2,
        subheading: subheading2
      }
      var data3 = {
        img: imgurl3,
        heading: heading3,
        subheading: subheading3
      }
      await axios.post(`${process.env.REACT_APP_SERVER}/swiper/create`, data1).then((res) => {
        return res.data;
      });
      await axios.post(`${process.env.REACT_APP_SERVER}/swiper/create`, data2).then((res) => {
        return res.data;
      });
      await axios.post(`${process.env.REACT_APP_SERVER}/swiper/create`, data3).then((res) => {
        return res.data;
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }
  }
  useEffect(() => {
    getfoodcard()
  }, [])
  const getfoodcard = async () => {
    var allfood = await axios.get(`${process.env.REACT_APP_SERVER}/swiper/viewall`).then((res) => {
      return res.data;
    });
    if (allfood.length !== 0) {
      document.getElementById("heading1").value = allfood[0].heading
      document.getElementById("heading2").value = allfood[1].heading
      document.getElementById("heading3").value = allfood[2].heading
      document.getElementById("subheading1").value = allfood[0].subheading
      document.getElementById("subheading2").value = allfood[1].subheading
      document.getElementById("subheading3").value = allfood[2].subheading
      setupdateid1(allfood[0].id)
      setupdateid2(allfood[1].id)
      setupdateid3(allfood[2].id)
      setimgvalue1(allfood[0].img)
      setimgvalue2(allfood[1].img)
      setimgvalue3(allfood[2].img)
      setupdate(true)
      setaboutdata(allfood)
    }
  }
  const updatebtn = async () => {
    var heading1 = document.getElementById("heading1").value
    var heading2 = document.getElementById("heading2").value
    var heading3 = document.getElementById("heading3").value
    var subheading1 = document.getElementById("subheading1").value
    var subheading2 = document.getElementById("subheading2").value
    var subheading3 = document.getElementById("subheading3").value
    if (heading1.length === 0) {
      toast.error("Heading 1 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading1.length === 0) {
      toast.error("Sub Heading 1 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (heading2.length === 0) {
      toast.error("Heading 2 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading2.length === 0) {
      toast.error("Sub Heading 2 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (heading3.length === 0) {
      toast.error("Heading 3 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else if (subheading1.length === 0) {
      toast.error("Sub Heading 3 Required...", {
        autoClose: 5000,
        transition: Slide,
      });
    } else {
      toast.info("Please Wait...", {
        autoClose: 5000,
        transition: Slide,
      });

      var data1 = {
        img: imgvalue1,
        heading: heading1,
        subheading: subheading1,
        id: updateid1
      }
      var data2 = {
        img: imgvalue2,
        heading: heading2,
        subheading: subheading2,
        id: updateid2
      }
      var data3 = {
        img: imgvalue3,
        heading: heading3,
        subheading: subheading3,
        id: updateid3
      }
      await axios.post(`${process.env.REACT_APP_SERVER}/swiper/update`, data1).then((res) => {
        return res.data;
      });
      await axios.post(`${process.env.REACT_APP_SERVER}/swiper/update`, data2).then((res) => {
        return res.data;
      });
      await axios.post(`${process.env.REACT_APP_SERVER}/swiper/update`, data3).then((res) => {
        return res.data;
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }
  }
  const geturl1 = async (e) => {
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
    setimgvalue1(imgurl1)
  }
  const geturl2 = async (e) => {
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
    setimgvalue2(imgurl1)
  }
  const geturl3 = async (e) => {
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
    console.log(imgurl1, "3")
    setimgvalue3(imgurl1)
  }
  return (
    <div className="Swiper_page_container">
      <h1>Swiper</h1>
      <div className="Swiper_page">
        <div className="Swiper_data">
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input id="heading1" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input id="subheading1" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Images</label>
              {updateid1 === null ? <input id="upfile1" type="file" multiple /> : <input id="upfile1" type="file" onChange={geturl1} />}
            </div>
          </div>
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input id="heading2" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input id="subheading2" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Images</label>
              {updateid2 === null ? <input id="upfile2" type="file" multiple /> : <input id="upfile2" type="file" onChange={geturl2} />}
            </div>
          </div>
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input id="heading3" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input id="subheading3" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Images</label>
              {updateid2 === null ? <input id="upfile3" type="file" multiple /> : <input id="upfile3" type="file" onChange={geturl3} />}
            </div>
          </div>
          <div className="Swiper_actions">
            {update === true ? <button onClick={updatebtn}>Apply</button> : <button onClick={applybtn}>Apply</button>}
          </div>
        </div>
        <div className="Swiper_results">
          <div className="HomeHeadSwiper">
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="HomeHeadSwiper"
            >
              {aboutdata.length !== 0 ? aboutdata.map((data, index) => (
                <SwiperSlide key={index}>
                  <div className="HomeHeadSlide1">
                    <img className="wallpaper" src={data.img} alt="" />
                    <div className="HomeHeadSlide1Content">
                      <h1>{data.heading}</h1>
                      <h2>{data.subheading}</h2>
                      <button className="viewOurmenubtn">VIEW OUR MENU</button>
                    </div>
                  </div>
                </SwiperSlide>
              )) : null}

            </Swiper>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Swiper_Head;
