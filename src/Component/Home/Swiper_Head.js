import React from "react";
import "../../Assests/css/Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import wallpaper from "../../Assests/img/Buffalo Tripe-.png";
import wallpaper1 from "../../Assests/img/g2.jpeg";
import wallpaper2 from "../../Assests/img/home.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
const Swiper_Head = () => {
  function getFile() {
    document.getElementById("upfile").click();
  }
  const SubmitHandler = () => {
    var Heading_1 = document.getElementById("swiper_head_1").value;
    var Heading_2 = document.getElementById("swiper_head_2").value;
    var Heading_3 = document.getElementById("swiper_head_3").value;
    var Sub_Heading_1 = document.getElementById("swiper_sub_head_1").value;
    var Sub_Heading_2 = document.getElementById("swiper_sub_head_2").value;
    var Sub_Heading_3 = document.getElementById("swiper_sub_head_3").value;
    var data = {
      Heading_1: Heading_1,
      Heading_2: Heading_2,
      Heading_3: Heading_3,
      Sub_Heading_1: Sub_Heading_1,
      Sub_Heading_2: Sub_Heading_2,
      Sub_Heading_3: Sub_Heading_3,
    };
    console.log(data);
  };
  return (
    <div className="Swiper_page_container">
      <h1>Swiper</h1>
      <div className="Swiper_page">
        <div className="Swiper_data">
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input id="swiper_head_1" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input id="swiper_sub_head_1" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Images</label>
              <input id="upfile" type="file" multiple />
            </div>
          </div>
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input id="swiper_head_2" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input id="swiper_sub_head_2" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Images</label>
              <input id="upfile" type="file" multiple />
            </div>
          </div>
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input id="swiper_head_3" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input id="swiper_sub_head_3" />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Images</label>
              <input id="upfile" type="file" multiple />
            </div>
          </div>
          <div className="Swiper_actions">
            <button onClick={SubmitHandler}>Apply</button>
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
              <SwiperSlide>
                <div className="HomeHeadSlide1">
                  <img className="wallpaper" src={wallpaper1} alt="" />
                  <div className="HomeHeadSlide1Content">
                    <h1>TRUE DELIZIOUS</h1>
                    <h2>Enjoy the real fresh food from our chef</h2>
                    <button className="viewOurmenubtn">VIEW OUR MENU</button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="HomeHeadSlide1">
                  <img className="wallpaper" src={wallpaper} alt="" />
                  <div className="HomeHeadSlide1Content">
                    <h1>TRUE DELIZIOUS</h1>
                    <h2>Enjoy the real fresh food from our chef</h2>
                    <button className="viewOurmenubtn">VIEW OUR MENU</button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="HomeHeadSlide1">
                  <img className="wallpaper" src={wallpaper2} alt="" />
                  <div className="HomeHeadSlide1Content">
                    <h1>TRUE DELIZIOUS</h1>
                    <h2>Enjoy the real fresh food from our chef</h2>
                    <button className="viewOurmenubtn">VIEW OUR MENU</button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swiper_Head;
