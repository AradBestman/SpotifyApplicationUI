import React, { useEffect, useState } from "react";
import image from "../images/peace.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Container from "@mui/material/Container";
import Playlists from "./Playlists";
import nextKey from "generate-my-key";
import axios from "axios";

const Categories = () => {
  const [dataCategories, setDataCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/category")
      .then((response) => {
        console.log(response);
        setDataCategories(response.data); // Corrected to access response.data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="mainInner">
      {dataCategories.map((category) => (
        <div key={nextKey()}>
          <div className="cardsWrap" key={nextKey()}>
            <h2>{category.name}</h2>
            <span className="seeAll">SEE ALL</span>
            <p className="subText">{category.tagline}</p>
            <Playlists category_id={category._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
