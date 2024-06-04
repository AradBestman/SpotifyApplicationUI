import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import axios from "axios";
import ReactPlayer from "react-player";
import { authActions, useLikedSongs } from "../store/authSlice";
import { useDispatch } from "react-redux";
let likedSongs = [];
const GetAllSongsPage = () => {
  let { id } = useParams();
  const [songs, setSongs] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();
  const { likedSongs, isLiked } = useLikedSongs();
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/songs")
      .then(({ data }) => {
        console.log(data);
        setSongs(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleLikeClick = async (song) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:5001/api/v1/songs/like",
        { song_id: song._id }
      );
      if (isLiked(song._id)) {
        dispatch(
          authActions.setLikedSongs(
            likedSongs.filter((s) => s._id !== song._id)
          )
        );
      } else {
        dispatch(authActions.setLikedSongs([...likedSongs, song]));
      }
      console.log("setIsLiked");
    } catch (err) {
      console.log("like err", err);
    }
  };

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            <img
              src="https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80"
              alt="pic"
            />
          </div>
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Playlist</p>
            <h1>A Perfect Day</h1>
            <p className="tagline">
              Minimalism, electronica and modern classical to concentrate to.
            </p>
            <div className="playlistPageDesc">
              <p className="spotify">Spotify</p>
              <span>699,428 likes</span>
              <span>4hr 35 min</span>
            </div>
          </div>
        </div>
        <div className="playlistPageSongs">
          <div className="playlistButtons">
            <span className="playIcon">
              <PlayArrowIcon />
            </span>
            <div className="icons">
              <div className="icon iconsHeart">
                <FavoriteIcon />
              </div>
              <div className="icon iconsDots"></div>
            </div>
          </div>
          {songs && likedSongs && (
            <ul className="songList">
              {songs.map((song, index) => (
                <li key={index}>
                  <div className="songIcon">
                    <MusicNoteIcon className="noteI" />
                    <PlayArrowIcon
                      className="playI"
                      onClick={() => {
                        if (song.path) {
                          const url = `http://localhost:5001/${
                            song.path.split("public/")[1]
                          }`;
                          if (playingSong === url) {
                            setPlayingSong(undefined);
                          } else {
                            setPlayingSong(url);
                          }
                        }
                      }}
                    />
                    <FavoriteIcon
                      style={{ fill: isLiked(song._id) ? "red" : "white" }}
                      onClick={() => {
                        handleLikeClick(song);
                      }}
                    />
                  </div>
                  <div className="songDetails">
                    <h3>{song.originalname}</h3>
                    <span>{song.artist}</span>
                  </div>
                  <div className="songTime">
                    <span>{song.size}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {playingSong && (
            <ReactPlayer
              style={{ opacity: 0 }}
              url={playingSong}
              controls
              playing
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllSongsPage;
