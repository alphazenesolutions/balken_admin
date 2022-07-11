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

  return (
    <div>
      <h1>Swiper</h1>
      <div className="Swiper_page">
        <div className="Swiper_data">
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs_files">
              <label>Swiper Images</label>
              <input id="upfile" type="file" multiple />
            </div>
            <div className="Swiper_images_upload">
              <button onClick={getFile}>Upload</button>
            </div>
          </div>
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs_files">
              <label>Swiper Images</label>
              <input id="upfile" type="file" multiple />
            </div>
            <div className="Swiper_images_upload">
              <button onClick={getFile}>Upload</button>
            </div>
          </div>
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Swiper Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs">
              <label>Swiper Sub Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs_files">
              <label>Swiper Images</label>
              <input id="upfile" type="file" multiple />
            </div>
            <div className="Swiper_images_upload">
              <button onClick={getFile}>Upload</button>
            </div>
          </div>
          <div className="Swiper_actions">
            <button>Apply</button>
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
