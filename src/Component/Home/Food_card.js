import React from "react";
import "../../Assests/css/Home.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import chicken1 from "../../Assests/img/home2.jpg";
import chicken from "../../Assests/img/chicken3.jpg";
import chicken2 from "../../Assests/img/home3.png";
import { Button, CardActionArea, CardActions } from "@mui/material";
const Food_card = () => {
  function getFile() {
    document.getElementById("upfile").click();
  }
  return (
    <div>
      <h1>Food Cards</h1>
      <div className="FoodCard">
        <div className="Swiper_data">
          <div className="Swiper_1">
            <div className="Swiper_inputs">
              <label>Card Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs">
              <label>Card Description</label>
              <textarea rows={5} />
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
              <label>Card Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs">
              <label>Card Description</label>
              <textarea rows={5} />
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
              <label>Card Heading</label>
              <input />
            </div>
            <div className="Swiper_inputs">
              <label>Card Description</label>
              <textarea rows={5} />
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
        <div className="HomeBooknowCards">
          <Card sx={{ maxWidth: 300 }} className="HomeBooknowCard">
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                image={chicken2}
                alt="green iguana"
              />
              <CardContent>
                <h1 className="HomeBooknowCardHead"> Health & Tasty </h1>
                <Typography variant="body2" className="HomeBooknowCardContent">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" className="HomeBooknowCardBtn">
                Read More
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 300 }} className="HomeBooknowCard">
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                image={chicken}
                alt="green iguana"
              />
              <CardContent>
                <h1 className="HomeBooknowCardHead"> Health & Tasty </h1>
                <Typography variant="body2" className="HomeBooknowCardContent">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" className="HomeBooknowCardBtn">
                Read More
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 300 }} className="HomeBooknowCard">
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                image={chicken1}
                alt="green iguana"
              />
              <CardContent>
                <h1 className="HomeBooknowCardHead"> Health & Tasty </h1>
                <Typography variant="body2" className="HomeBooknowCardContent">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" className="HomeBooknowCardBtn">
                Read More
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Food_card;
