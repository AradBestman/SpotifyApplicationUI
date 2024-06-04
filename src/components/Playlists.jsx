import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import image from "../images/peace.jpg";
import nextKey from "generate-my-key";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";

const Playlists = (props) => {
  console.log("RENDERRRRRRRR");
  const [dataPlaylists, setPlaylists] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/playlist/").then(({ data }) => {
      console.log(data);
      setPlaylists(data);
    });
  }, []);
  // const dataPlaylists = [
  //   {
  //     id: 101,
  //     category_id: 3,
  //     name: "Home Playlist 1",
  //     img: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  //   {
  //     id: 102,
  //     category_id: 3,
  //     name: "Home Playlist 2",
  //     img: "https://images.unsplash.com/photo-1705446316985-b707de831902?q=80&w=3539&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  //   {
  //     id: 103,
  //     category_id: 3,
  //     name: "Focus Playlist 3",
  //     img: "https://images.unsplash.com/photo-1706125356134-a20ea29b412b?q=80&w=3569&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  //   {
  //     id: 104,
  //     category_id: 1,
  //     name: "Focus Playlist 1",
  //     img: "https://images.unsplash.com/photo-1682687980976-fec0915c6177?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  //   {
  //     id: 105,
  //     category_id: 4,
  //     name: "Sunday Playlist 1",
  //     img: "https://images.unsplash.com/photo-1706087270134-436d8b4fc15b?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  //   {
  //     id: 106,
  //     category_id: 2,
  //     name: "Mood Playlist 1",
  //     img: "https://images.unsplash.com/photo-1704115859446-601dfae181c2?q=80&w=3735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  //   {
  //     id: 107,
  //     category_id: 2,
  //     name: "Mood Playlist 2",
  //     img: "https://images.unsplash.com/photo-1682687219570-4c596363fd96?q=80&w=3475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     desc: "",
  //   },
  // ];

  const mactedPlaylists = dataPlaylists.filter(
    (playlist) => playlist.category_id === props.category_id
  );
  return (
    <div className="cardsWrapInner">
      {mactedPlaylists.map((playlist) => (
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/playlist/` + playlist._id}
        >
          <div className="card" key={nextKey()}>
            <div className="cardImage">
              <img src={playlist.img} alt="" />
            </div>
            <div className="cardContent">
              <h3>{playlist.name}</h3>
              <span>{playlist.desc}</span>
            </div>
            <span className="playIcon">
              <PlayArrowIcon />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Playlists;
