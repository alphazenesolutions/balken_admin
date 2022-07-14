import React from "react";
import "../../Assests/css/Home.css";
import Kitchen from "../../Assests/img/kitchen.jpeg";

const Welcome_to_balken = () => {
  function getFile() {
    document.getElementById("upfile").click();
  }
  return (
    <div>
      <h1>About Balken</h1>
      <div>
        <div className="Home_kitchen_inputs">
          <div className="Swiper_inputs">
            <label>Heading</label>
            <input />
          </div>
          <div className="Swiper_inputs">
            <label>Sub Heading</label>
            <input />
          </div>
          <div className="Swiper_inputs">
            <label>Description</label>
            <input />
          </div>
          <div className="Swiper_inputs">
            <label>Swiper Images</label>
            <input id="upfile" type="file" multiple />
          </div>

          <div className="Swiper_actions">
            <button>Apply</button>
          </div>
        </div>
        <div className="HomeKitchenContainer">
          <img src={Kitchen} alt="" />
          <div className="HomeKitchenContent">
            <div className="HomeKitchenContentss">
              <div className="ArtofCookingHead">
                <h1 className="ArtofCookingWelcome">WELCOME TO BALKEN.</h1>
                <p className="ArtofCooking">The Art of Cooking</p>
                <p className="emptyBorder"></p>
              </div>
              <p className="ArtofCookingContent">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset
              </p>
              <button className="ArtofCookingReadMoreBtn">READ MORE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome_to_balken;
